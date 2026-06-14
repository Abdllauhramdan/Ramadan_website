<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\WhyUs;
use Illuminate\Http\Request;

class WhyUsController extends Controller
{
    public function index()
    {
        return response()->json(WhyUs::orderBy('sort')->get());
    }

    public function store(Request $request)
    {
        return response()->json(WhyUs::create($this->validated($request)), 201);
    }

    public function update(Request $request, WhyUs $whyUs)
    {
        $whyUs->update($this->validated($request));

        return response()->json($whyUs);
    }

    public function destroy(WhyUs $whyUs)
    {
        $whyUs->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'icon' => ['nullable', 'string'],
            'title' => ['nullable', 'array'],
            'text' => ['nullable', 'array'],
            'sort' => ['nullable', 'integer'],
        ]);
    }
}
