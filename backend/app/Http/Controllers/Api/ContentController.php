<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ApiResponseService;
use App\Services\ContentService;
use Illuminate\Http\JsonResponse;

class ContentController extends Controller
{
    public function __construct(protected ContentService $contentService) {}

    /** Public aggregated content for the React site. */
    public function index(): JsonResponse
    {
        $content = $this->contentService->getPublicContent();

        return ApiResponseService::success($content, 'Content retrieved successfully');
    }
}
