<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Hero;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    public function show()
    {
        return response()->json(Hero::firstOrCreate(['id' => 1]));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'badge' => ['nullable', 'array'],
            'title' => ['nullable', 'array'],
            'subtitle' => ['nullable', 'array'],
            'image' => ['nullable', 'string'],
            'cta_primary' => ['nullable', 'array'],
            'cta_secondary' => ['nullable', 'array'],
        ]);

        $hero = Hero::firstOrCreate(['id' => 1]);
        $hero->update($data);

        return response()->json($hero);
    }
}
