<?php

namespace App\Http\Requests;

class SettingRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'name' => 'nullable|array',
            'tagline' => 'nullable|array',
            'logo' => 'nullable|string',
            'phone' => 'nullable|string',
            'whatsapp' => 'nullable|string',
            'email' => 'nullable|string',
            'address' => 'nullable|array',
            'working_hours' => 'nullable|array',
            'social' => 'nullable|array',
        ];
    }
}
