<?php

namespace App\Services;

use App\Models\Setting;

class SettingService
{
    /** Get the (single) settings row, creating it if missing. */
    public function show(): Setting
    {
        return Setting::firstOrCreate(['id' => 1]);
    }

    /** Update the settings row. */
    public function update(array $data): Setting
    {
        $setting = Setting::firstOrCreate(['id' => 1]);
        $setting->update($data);

        return $setting;
    }
}
