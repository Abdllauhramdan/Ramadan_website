<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return response()->json(Service::orderBy('sort')->get());
    }

    public function store(Request $request)
    {
        $service = Service::create($this->validated($request));

        return response()->json($service, 201);
    }

    public function update(Request $request, Service $service)
    {
        $service->update($this->validated($request));

        return response()->json($service);
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'icon' => ['nullable', 'string'],
            'title' => ['nullable', 'array'],
            'description' => ['nullable', 'array'],
            'sort' => ['nullable', 'integer'],
        ]);
    }
}
