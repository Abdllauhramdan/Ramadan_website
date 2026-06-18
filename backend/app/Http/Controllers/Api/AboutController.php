<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AboutRequest;
use App\Services\AboutService;
use App\Services\ApiResponseService;
use Illuminate\Http\JsonResponse;

class AboutController extends Controller
{
    public function __construct(protected AboutService $aboutService) {}

    public function show(): JsonResponse
    {
        return ApiResponseService::success($this->aboutService->show(), 'About retrieved successfully');
    }

    public function update(AboutRequest $request): JsonResponse
    {
        $about = $this->aboutService->update($request->validated());

        return ApiResponseService::success($about, 'About updated successfully');
    }
}
