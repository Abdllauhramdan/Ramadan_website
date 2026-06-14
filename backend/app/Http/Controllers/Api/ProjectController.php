<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index()
    {
        return response()->json(Project::orderBy('sort')->get());
    }

    public function store(Request $request)
    {
        $project = Project::create($this->validated($request));

        return response()->json($project, 201);
    }

    public function update(Request $request, Project $project)
    {
        $project->update($this->validated($request));

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return response()->json(['message' => 'Deleted']);
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['nullable', 'array'],
            'category' => ['nullable', 'string', 'in:buildings,decor,designs'],
            'image' => ['nullable', 'string'],
            'year' => ['nullable', 'string'],
            'location' => ['nullable', 'array'],
            'description' => ['nullable', 'array'],
            'sort' => ['nullable', 'integer'],
        ]);
    }
}
