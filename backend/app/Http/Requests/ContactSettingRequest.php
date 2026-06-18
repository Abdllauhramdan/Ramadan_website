<?php

namespace App\Http\Requests;

class ContactSettingRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'title' => 'nullable|array',
            'subtitle' => 'nullable|array',
        ];
    }
}
