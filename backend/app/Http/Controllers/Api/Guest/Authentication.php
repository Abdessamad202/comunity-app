<?php

namespace App\Http\Controllers\Api\Guest;

use App\Http\Controllers\Controller;
use App\Http\Requests\Guest\CheckCodeRequest;
use App\Http\Requests\Guest\RegisterRequest;
use App\Jobs\SendVerificationCode;
use App\Models\User;
use App\Models\Verification;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class Authentication extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('auth:sanctum', except: ['registerStep1']),
        ];
    }
    // Step 1: Register the user
    public function registerStep1(RegisterRequest $request)
    {
        $data = $request->validated(); // Validate and get data from request
        $code = $this->generateCode(); // Generate a unique verification code

        // Create a new user in the database
        $user = User::create($data);
        $user->refresh(); // Refresh the user object to get the new ID

        // Store the verification code in the database
        $this->storeCode($user->id, $code);

        // Create a token for the user after successful verification

        // Dispatch a job to send the verification code via email
        SendVerificationCode::dispatch($user->email, $code);

        // Return a response with instructions
        return response()->json([
            'user_id' => $user->id,
            'step' => $user->step,
            'message' => 'Verification code sent successfully',
            'token' => $user->createToken('authToken')->plainTextToken
        ]);
    }
    // resend the code to validate the email
    public function resendCode()
    {
        $user = Auth::user(); // Ensure only the authenticated user can request a resend.

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Unauthorized'], 401);
        }

        if ($user->step !== 1) {
            return response()->json(['success' => false, 'message' => 'You cannot resend the verification code at this step'], 400);
        }

        $code = $this->generateCode();
        $this->storeCode($user->id, $code);
        SendVerificationCode::dispatch($user->email, $code);
        return response()->json(['success' => true, 'message' => 'Verification code resent successfully'], 200);
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
            return response()->json(['success' => true, 'message' => 'Email verified successfully','step' => $user->step], 200);
        }

        // Return an error response if the code is invalid
        return response()->json([
            'success' => false,
            'errors' => [

                "code" => [
                    "The code does not match."
                ]
            ]
        ], 400);
    }
    // Store the verification code in the database
    protected function storeCode(int $user_id, int $code)
    {
        Verification::updateOrCreate([
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
