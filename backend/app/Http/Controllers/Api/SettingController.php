<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SettingRequest;
use App\Services\ApiResponseService;
use App\Services\SettingService;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    public function __construct(protected SettingService $settingService) {}

    public function show(): JsonResponse
    {
        return ApiResponseService::success($this->settingService->show(), 'Settings retrieved successfully');
    }

    public function update(SettingRequest $request): JsonResponse
    {
        $setting = $this->settingService->update($request->validated());

        return ApiResponseService::success($setting, 'Settings updated successfully');
    }
}
