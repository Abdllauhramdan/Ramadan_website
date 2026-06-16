<?php

use Illuminate\Support\Facades\Route;

// This backend is API-only; the public site is the React app in ../frontend.
// The root route returns a small status payload so health checks succeed.
Route::get('/', function () {
    return response()->json([
        'app' => 'RAMADAN Engineering API',
        'status' => 'ok',
        'docs' => 'See README.md — public content at /api/content',
    ]);
});
