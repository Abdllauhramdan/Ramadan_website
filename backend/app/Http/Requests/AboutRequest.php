<?php

namespace App\Http\Requests;

class AboutRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'nullable|array',
            'lead' => 'nullable|array',
            'body' => 'nullable|array',
            'image' => 'nullable|string',
            'points' => 'nullable|array',
        ];
    }
}
