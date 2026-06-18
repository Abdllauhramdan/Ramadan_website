<?php

namespace App\Http\Requests;

use App\Services\ApiResponseService;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

/**
 * Base form request: all API requests return validation failures using the
 * standard ApiResponseService envelope { status, message, data }.
 */
abstract class ApiFormRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(
            ApiResponseService::error('Validation errors', 422, $validator->errors()->toArray())
        );
    }
}
