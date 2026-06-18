<?php

namespace App\Services;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;

class ProjectService
{
    public function list(): Collection
    {
        return Project::orderBy('sort')->get();
    }

    public function create(array $data): Project
    {
        return Project::create($data);
    }

    public function update(array $data, int $id): Project
    {
        $project = Project::findOrFail($id);
        $project->update($data);

        return $project;
    }

    public function delete(int $id): void
    {
        Project::findOrFail($id)->delete();
    }
}
