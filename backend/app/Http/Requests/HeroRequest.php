<?php

namespace App\Http\Requests;

class HeroRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'badge' => 'nullable|array',
            'title' => 'nullable|array',
            'subtitle' => 'nullable|array',
            'image' => 'nullable|string',
            'cta_primary' => 'nullable|array',
            'cta_secondary' => 'nullable|array',
        ];
    }
}
