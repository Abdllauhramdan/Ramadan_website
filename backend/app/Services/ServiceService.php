<?php

namespace App\Services;

use App\Models\Service;
use Illuminate\Database\Eloquent\Collection;

class ServiceService
{
    public function list(): Collection
    {
        return Service::orderBy('sort')->get();
    }

    public function create(array $data): Service
    {
        return Service::create($data);
    }

    public function update(array $data, int $id): Service
    {
        $service = Service::findOrFail($id);
        $service->update($data);

        return $service;
    }

    public function delete(int $id): void
    {
        Service::findOrFail($id)->delete();
    }
}
