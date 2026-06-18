<?php

use App\Services\ApiResponseService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
 * Single-host setup: Laravel serves the built React app (placed in public/)
 * and the API under /api. If the SPA build is present, every non-API route
 * returns index.html so the front-end router handles it; otherwise a small
 * JSON status payload is returned (useful before the front-end is deployed).
 */
$serveSpa = function (Request $request) {
    // Unknown API routes must return a JSON 404, not the SPA.
    if ($request->is('api/*')) {
        return ApiResponseService::error('Resource not found', 404);
    }

    $index = public_path('index.html');

    if (file_exists($index)) {
        return response()->file($index);
    }

    return response()->json([
        'app' => 'RAMADAN Engineering API',
        'status' => 'ok',
        'docs' => 'Public content at /api/content',
    ]);
};

Route::get('/', $serveSpa);
Route::fallback($serveSpa);
