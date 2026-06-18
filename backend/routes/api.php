<?php

use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\ContactSettingController;
use App\Http\Controllers\Api\ContentController;
use App\Http\Controllers\Api\HeroController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\StatController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\WhyUsController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public API
|--------------------------------------------------------------------------
*/
Route::get('/content', [ContentController::class, 'index']);
Route::post('/contact-messages', [ContactMessageController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

/*
|--------------------------------------------------------------------------
| Protected admin API (Sanctum token)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    // Account
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Image uploads
    Route::post('/uploads', [UploadController::class, 'store']);

    // Singleton sections
    Route::get('/settings', [SettingController::class, 'show']);
    Route::put('/settings', [SettingController::class, 'update']);
    Route::get('/hero', [HeroController::class, 'show']);
    Route::put('/hero', [HeroController::class, 'update']);
    Route::get('/about', [AboutController::class, 'show']);
    Route::put('/about', [AboutController::class, 'update']);
    Route::get('/contact-settings', [ContactSettingController::class, 'show']);
    Route::put('/contact-settings', [ContactSettingController::class, 'update']);

    // Services
    Route::get('/services', [ServiceController::class, 'index']);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);

    // Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    // Stats
    Route::get('/stats', [StatController::class, 'index']);
    Route::post('/stats', [StatController::class, 'store']);
    Route::put('/stats/{id}', [StatController::class, 'update']);
    Route::delete('/stats/{id}', [StatController::class, 'destroy']);

    // Why-us
    Route::get('/why-us', [WhyUsController::class, 'index']);
    Route::post('/why-us', [WhyUsController::class, 'store']);
    Route::put('/why-us/{id}', [WhyUsController::class, 'update']);
    Route::delete('/why-us/{id}', [WhyUsController::class, 'destroy']);

    // Contact messages management
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::put('/contact-messages/{id}', [ContactMessageController::class, 'update']);
    Route::delete('/contact-messages/{id}', [ContactMessageController::class, 'destroy']);
});
