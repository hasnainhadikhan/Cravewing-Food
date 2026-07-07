<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CateringController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\JobApplicationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\SubscriberController;
use Illuminate\Support\Facades\Route;

// ── Public form endpoints (match the frontend forms) ──
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::post('/contact', [ContactController::class, 'store']);        // Get in Touch
Route::post('/catering', [CateringController::class, 'store']);      // Request a Quote
Route::post('/careers/apply', [JobApplicationController::class, 'store']); // Careers apply
Route::post('/subscribe', [SubscriberController::class, 'store']);   // Newsletter

Route::post('/orders', [OrderController::class, 'store']);           // Checkout
Route::get('/orders/{reference}', [OrderController::class, 'show']); // Order tracking

// ── Authenticated ──
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
});
