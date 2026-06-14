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
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/change-password', [AuthController::class, 'changePassword']);

    // Singleton sections
    Route::get('/settings', [SettingController::class, 'show']);
    Route::put('/settings', [SettingController::class, 'update']);
    Route::get('/hero', [HeroController::class, 'show']);
    Route::put('/hero', [HeroController::class, 'update']);
    Route::get('/about', [AboutController::class, 'show']);
    Route::put('/about', [AboutController::class, 'update']);
    Route::get('/contact-settings', [ContactSettingController::class, 'show']);
    Route::put('/contact-settings', [ContactSettingController::class, 'update']);

    // Collections
    Route::apiResource('services', ServiceController::class)->except(['show']);
    Route::apiResource('projects', ProjectController::class)->except(['show']);
    Route::apiResource('stats', StatController::class)->except(['show']);
    Route::apiResource('why-us', WhyUsController::class)
        ->parameters(['why-us' => 'whyUs'])
        ->except(['show']);

    // Contact submissions management
    Route::get('/contact-messages', [ContactMessageController::class, 'index']);
    Route::put('/contact-messages/{message}', [ContactMessageController::class, 'update']);
    Route::delete('/contact-messages/{message}', [ContactMessageController::class, 'destroy']);
});
