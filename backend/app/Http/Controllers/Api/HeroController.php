<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\HeroRequest;
use App\Services\ApiResponseService;
use App\Services\HeroService;
use Illuminate\Http\JsonResponse;

class HeroController extends Controller
{
    public function __construct(protected HeroService $heroService) {}

    public function show(): JsonResponse
    {
        return ApiResponseService::success($this->heroService->show(), 'Hero retrieved successfully');
    }

    public function update(HeroRequest $request): JsonResponse
    {
        $hero = $this->heroService->update($request->validated());

        return ApiResponseService::success($hero, 'Hero updated successfully');
    }
}
