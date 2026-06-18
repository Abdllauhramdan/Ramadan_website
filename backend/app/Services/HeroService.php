<?php

namespace App\Services;

use App\Models\Hero;

class HeroService
{
    public function show(): Hero
    {
        return Hero::firstOrCreate(['id' => 1]);
    }

    public function update(array $data): Hero
    {
        $hero = Hero::firstOrCreate(['id' => 1]);
        $hero->update($data);

        return $hero;
    }
}
