<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactSettingRequest;
use App\Services\ApiResponseService;
use App\Services\ContactSettingService;
use Illuminate\Http\JsonResponse;

class ContactSettingController extends Controller
{
    public function __construct(protected ContactSettingService $contactSettingService) {}

    public function show(): JsonResponse
    {
        return ApiResponseService::success($this->contactSettingService->show(), 'Contact settings retrieved successfully');
    }

    public function update(ContactSettingRequest $request): JsonResponse
    {
        $contact = $this->contactSettingService->update($request->validated());

        return ApiResponseService::success($contact, 'Contact settings updated successfully');
    }
}
