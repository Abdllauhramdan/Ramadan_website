<?php

namespace App\Services;

use App\Models\About;

class AboutService
{
    public function show(): About
    {
        return About::firstOrCreate(['id' => 1]);
    }

    public function update(array $data): About
    {
        $about = About::firstOrCreate(['id' => 1]);
        $about->update($data);

        return $about;
    }
}
