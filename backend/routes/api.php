<?php

use App\Http\Controllers\Api\Guest\Authentication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register/step-1',[Authentication::class,'registerStep1']);
Route::post('/register/step-2/{user}',[Authentication::class,'registerStep2']);