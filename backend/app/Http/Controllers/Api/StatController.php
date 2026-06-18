<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StatRequest;
use App\Services\ApiResponseService;
use App\Services\StatService;
use Illuminate\Http\JsonResponse;

class StatController extends Controller
{
    public function __construct(protected StatService $statService) {}

    public function index(): JsonResponse
    {
        return ApiResponseService::success($this->statService->list(), 'Stats retrieved successfully');
    }

    public function store(StatRequest $request): JsonResponse
    {
        $stat = $this->statService->create($request->validated());

        return ApiResponseService::success($stat, 'Stat created successfully', 201);
    }

    public function update(StatRequest $request, int $id): JsonResponse
    {
        $stat = $this->statService->update($request->validated(), $id);

        return ApiResponseService::success($stat, 'Stat updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->statService->delete($id);

        return ApiResponseService::success(null, 'Stat deleted successfully');
    }
}
