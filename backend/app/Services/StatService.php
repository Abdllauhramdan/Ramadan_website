<?php

namespace App\Services;

use App\Models\Stat;
use Illuminate\Database\Eloquent\Collection;

class StatService
{
    public function list(): Collection
    {
        return Stat::orderBy('sort')->get();
    }

    public function create(array $data): Stat
    {
        return Stat::create($data);
    }

    public function update(array $data, int $id): Stat
    {
        $stat = Stat::findOrFail($id);
        $stat->update($data);

        return $stat;
    }

    public function delete(int $id): void
    {
        Stat::findOrFail($id)->delete();
    }
}
