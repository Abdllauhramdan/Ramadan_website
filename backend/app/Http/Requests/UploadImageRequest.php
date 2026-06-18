<?php

namespace App\Http\Requests;

class UploadImageRequest extends ApiFormRequest
{
    public function rules(): array
    {
        return [
            'image' => 'required|file|mimes:jpeg,jpg,png,gif,webp,svg|max:5120', // 5 MB
            'folder' => 'nullable|string|max:40',
        ];
    }
}
