<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\WhyUsRequest;
use App\Services\ApiResponseService;
use App\Services\WhyUsService;
use Illuminate\Http\JsonResponse;

class WhyUsController extends Controller
{
    public function __construct(protected WhyUsService $whyUsService) {}

    public function index(): JsonResponse
    {
        return ApiResponseService::success($this->whyUsService->list(), 'Why-us items retrieved successfully');
    }

    public function store(WhyUsRequest $request): JsonResponse
    {
        $whyUs = $this->whyUsService->create($request->validated());

        return ApiResponseService::success($whyUs, 'Why-us item created successfully', 201);
    }

    public function update(WhyUsRequest $request, int $id): JsonResponse
    {
        $whyUs = $this->whyUsService->update($request->validated(), $id);

        return ApiResponseService::success($whyUs, 'Why-us item updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->whyUsService->delete($id);

        return ApiResponseService::success(null, 'Why-us item deleted successfully');
    }
}
