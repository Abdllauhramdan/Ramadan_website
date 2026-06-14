<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\About;
use Illuminate\Http\Request;

class AboutController extends Controller
{
    public function show()
    {
        return response()->json(About::firstOrCreate(['id' => 1]));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => ['nullable', 'array'],
            'lead' => ['nullable', 'array'],
            'body' => ['nullable', 'array'],
            'image' => ['nullable', 'string'],
            'points' => ['nullable', 'array'],
        ]);

        $about = About::firstOrCreate(['id' => 1]);
        $about->update($data);

        return response()->json($about);
    }
}
