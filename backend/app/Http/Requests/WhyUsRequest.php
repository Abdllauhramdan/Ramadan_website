<?php

namespace App\Http\Requests;

class WhyUsRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'icon' => 'nullable|string|max:40',
            'title' => 'nullable|array',
            'text' => 'nullable|array',
            'sort' => 'nullable|integer',
        ];
    }
}
