<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ServiceRequest;
use App\Services\ApiResponseService;
use App\Services\ServiceService;
use Illuminate\Http\JsonResponse;

class ServiceController extends Controller
{
    public function __construct(protected ServiceService $serviceService) {}

    public function index(): JsonResponse
    {
        return ApiResponseService::success($this->serviceService->list(), 'Services retrieved successfully');
    }

    public function store(ServiceRequest $request): JsonResponse
    {
        $service = $this->serviceService->create($request->validated());

        return ApiResponseService::success($service, 'Service created successfully', 201);
    }

    public function update(ServiceRequest $request, int $id): JsonResponse
    {
        $service = $this->serviceService->update($request->validated(), $id);

        return ApiResponseService::success($service, 'Service updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->serviceService->delete($id);

        return ApiResponseService::success(null, 'Service deleted successfully');
    }
}
