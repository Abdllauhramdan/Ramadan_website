<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Stat;
use Illuminate\Http\Request;

class StatController extends Controller
{
    public function index()
    {
        return response()->json(Stat::orderBy('sort')->get());
    }

    public function store(Request $request)
    {
        return response()->json(Stat::create($this->validated($request)), 201);
    }

    public function update(Request $request, Stat $stat)
    {
        $stat->update($this->validated($request));

        return response()->json($stat);
    }

    public function destroy(Stat $stat)
    {
        $stat->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'value' => ['nullable', 'string'],
            'label' => ['nullable', 'array'],
            'sort' => ['nullable', 'integer'],
        ]);
    }
}
