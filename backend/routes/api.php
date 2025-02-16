<?php

use App\Http\Controllers\Api\Auth\ProfileController;
use App\Http\Controllers\Api\Guest\Authentication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register/step-1',[Authentication::class,'registerStep1']);
Route::post('/register/resend-code/{user}',[Authentication::class,'resendCode']);
Route::post('/register/step-2/{user}',[Authentication::class,'registerStep2']);
Route::post('/register/step-3/{user}',[Authentication::class,'registerStep3']);
Route::post('/login',[Authentication::class,'login']);
Route::post('/logout',[Authentication::class,'logout']);

// profile/${profile}

Route::get('/profile/{profile}',[ProfileController::class,'show']);