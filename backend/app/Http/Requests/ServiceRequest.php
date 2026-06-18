<?php

namespace App\Http\Requests;

class ServiceRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'icon' => 'nullable|string|max:40',
            'title' => 'nullable|array',
            'description' => 'nullable|array',
            'sort' => 'nullable|integer',
        ];
    }
}
