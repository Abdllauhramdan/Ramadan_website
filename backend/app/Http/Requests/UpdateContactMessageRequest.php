<?php

namespace App\Http\Requests;

class UpdateContactMessageRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'is_read' => 'required|boolean',
        ];
    }
}
