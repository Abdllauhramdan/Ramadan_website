<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadImageRequest;
use App\Services\ApiResponseService;
use App\Services\FileUploadService;
use Exception;
use Illuminate\Http\JsonResponse;

class UploadController extends Controller
{
    public function __construct(protected FileUploadService $fileUploadService) {}

    /** Upload an image and return its public URL. */
    public function store(UploadImageRequest $request): JsonResponse
    {
        try {
            $url = $this->fileUploadService->uploadImage(
                $request->file('image'),
                $request->input('folder', 'images')
            );

            return ApiResponseService::success(['url' => $url], 'Image uploaded successfully', 201);
        } catch (Exception $e) {
            return ApiResponseService::error($e->getMessage(), $e->getCode() ?: 422);
        }
    }
}
