<?php

namespace App\Http\Requests;

class ProjectRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'nullable|array',
            'category' => 'nullable|string|in:buildings,decor,designs',
            'image' => 'nullable|string',
            'images' => 'nullable|array',
            'images.*' => 'nullable|string',
            'year' => 'nullable|string|max:20',
            'location' => 'nullable|array',
            'description' => 'nullable|array',
            'sort' => 'nullable|integer',
        ];
    }
}
