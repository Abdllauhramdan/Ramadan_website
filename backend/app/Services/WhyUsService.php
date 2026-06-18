<?php

namespace App\Services;

use App\Models\WhyUs;
use Illuminate\Database\Eloquent\Collection;

class WhyUsService
{
    public function list(): Collection
    {
        return WhyUs::orderBy('sort')->get();
    }

    public function create(array $data): WhyUs
    {
        return WhyUs::create($data);
    }

    public function update(array $data, int $id): WhyUs
    {
        $whyUs = WhyUs::findOrFail($id);
        $whyUs->update($data);

        return $whyUs;
    }

    public function delete(int $id): void
    {
        WhyUs::findOrFail($id)->delete();
    }
}
