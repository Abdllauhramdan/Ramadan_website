<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProjectRequest;
use App\Services\ApiResponseService;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    public function __construct(protected ProjectService $projectService) {}

    public function index(): JsonResponse
    {
        return ApiResponseService::success($this->projectService->list(), 'Projects retrieved successfully');
    }

    public function store(ProjectRequest $request): JsonResponse
    {
        $project = $this->projectService->create($request->validated());

        return ApiResponseService::success($project, 'Project created successfully', 201);
    }

    public function update(ProjectRequest $request, int $id): JsonResponse
    {
        $project = $this->projectService->update($request->validated(), $id);

        return ApiResponseService::success($project, 'Project updated successfully');
    }

    public function destroy(int $id): JsonResponse
    {
        $this->projectService->delete($id);

        return ApiResponseService::success(null, 'Project deleted successfully');
    }
}
