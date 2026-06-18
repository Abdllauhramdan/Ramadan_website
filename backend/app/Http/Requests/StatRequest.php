<?php

namespace App\Http\Requests;

class StatRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'value' => 'nullable|string|max:40',
            'label' => 'nullable|array',
            'sort' => 'nullable|integer',
        ];
    }
}
