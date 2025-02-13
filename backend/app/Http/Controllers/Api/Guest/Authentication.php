<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\CheckCodeRequest;
use App\Http\Requests\Guest\RegisterRequest;
use App\Jobs\SendVerificationCode;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Support\Facades\Hash;

class Authentication extends Controller
{
    // Step 1: Register the user
    public function registerStep1(RegisterRequest $request)
    {
        $data = $request->validated(); // Validate and get data from request
        $code = $this->generateCode(); // Generate a unique verification code

        // Create a new user in the database
        $user = User::create($data);

        // Store the verification code in the database
        $this->storeCode($user->id, $code);

        // Create a token for the user after successful verification
        $token = $user->createToken($user->email);

        // Dispatch a job to send the verification code via email
        SendVerificationCode::dispatch($user->email, $code);

        // Return a response with instructions
        return response()->json([
            'message' => 'Check your inbox for the verification code.',
            'user_id' => $user->id,
            'token' => $token->plainTextToken
        ]);
    }

    // Step 2: Verify the user's email using the code
    public function registerStep2(CheckCodeRequest $request, User $user)
    {
        $user->load('verification'); // Load associated verification data

        // Check if the provided verification code matches the stored hashed code
        if (Hash::check($request->code, $user->verification->hashed_code)) {
            // Update the user's step to 2 (email verified)
            $user->update(['step' => 2]);

            // Delete the verification record since it's no longer needed
            $user->verification->delete();

            // Return the token as a response
            return response()->json(['success' => true], 200);
        }

        // Return an error response if the code is invalid
        return response()->json(['success' => false, 'message' => 'Invalid verification code'], 400);
    }

    // Store the verification code in the database
    protected function storeCode(int $user_id, int $code)
    {
        Verification::create([
            'user_id' => $user_id, // Store the user's ID
            'hashed_code' => Hash::make($code), // Hash and store the verification code
        ]);
    }

    // Generate a random verification code
    protected function generateCode()
    {
        $length = config('auth.verification_code_length', 6); // Get the code length from the config file
        return random_int(pow(10, $length - 1), pow(10, $length) - 1); // Generate a random number with the specified length
    }
}
