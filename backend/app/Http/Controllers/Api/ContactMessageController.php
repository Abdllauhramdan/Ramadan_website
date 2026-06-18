<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Http\Requests\UpdateContactMessageRequest;
use App\Services\ApiResponseService;
use App\Services\ContactMessageService;
use Illuminate\Http\JsonResponse;

class ContactMessageController extends Controller
{
    public function __construct(protected ContactMessageService $contactMessageService) {}

    /** Public: submit a contact message. */
    public function store(StoreContactMessageRequest $request): JsonResponse
    {
        $message = $this->contactMessageService->store($request->validated());

        return ApiResponseService::success(['id' => $message->id], 'Message sent successfully', 201);
    }

    /** Admin: list messages. */
    public function index(): JsonResponse
    {
        return ApiResponseService::success($this->contactMessageService->list(), 'Messages retrieved successfully');
    }

    /** Admin: mark read/unread. */
    public function update(UpdateContactMessageRequest $request, int $id): JsonResponse
    {
        $message = $this->contactMessageService->updateStatus($request->validated()['is_read'], $id);

        return ApiResponseService::success($message, 'Message updated successfully');
    }

    /** Admin: delete a message. */
    public function destroy(int $id): JsonResponse
    {
        $this->contactMessageService->delete($id);

        return ApiResponseService::success(null, 'Message deleted successfully');
    }
}
