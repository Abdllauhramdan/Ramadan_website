<?php

namespace App\Services;

use Illuminate\Pagination\LengthAwarePaginator;

/**
 * Centralised, standardised JSON responses for the whole API.
 * Every endpoint returns the same envelope: { status, message, data }.
 */
class ApiResponseService
{
    /**
     * Successful JSON response.
     */
    public static function success($data = null, string $message = 'Operation successful', int $status = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => trans($message),
            'data' => $data,
        ], $status);
    }

    /**
     * Error JSON response.
     */
    public static function error(string $message = 'Operation failed', int $status = 400, $data = null)
    {
        return response()->json([
            'status' => 'error',
            'message' => trans($message),
            'data' => $data,
        ], $status);
    }

    /**
     * Paginated JSON response.
     */
    public static function paginated(LengthAwarePaginator $paginator, string $message = 'Operation successful', int $status = 200)
    {
        return response()->json([
            'status' => 'success',
            'message' => trans($message),
            'data' => $paginator->items(),
            'pagination' => [
                'total' => $paginator->total(),
                'count' => $paginator->count(),
                'per_page' => $paginator->perPage(),
                'current_page' => $paginator->currentPage(),
                'total_pages' => $paginator->lastPage(),
            ],
        ], $status);
    }
}
