<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\LoginRequest;
use App\Services\ApiResponseService;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(protected AuthService $authService) {}

    public function login(LoginRequest $request): JsonResponse
    {
        try {
            $result = $this->authService->login($request->validated());

            return ApiResponseService::success($result, 'Logged in successfully');
        } catch (Exception $e) {
            return ApiResponseService::error($e->getMessage(), $e->getCode() ?: 401);
        }
    }

    public function me(Request $request): JsonResponse
    {
        $user = $request->user();

        return ApiResponseService::success(
            ['name' => $user->name, 'email' => $user->email],
            'User retrieved successfully'
        );
    }

    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return ApiResponseService::success(null, 'Logged out successfully');
    }

    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $this->authService->changePassword($request->user(), $data['current_password'], $data['new_password']);

            return ApiResponseService::success(null, 'Password changed successfully');
        } catch (Exception $e) {
            return ApiResponseService::error($e->getMessage(), $e->getCode() ?: 422);
        }
    }
}
