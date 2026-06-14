<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function show()
    {
        return response()->json(Setting::firstOrCreate(['id' => 1]));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'name' => ['nullable', 'array'],
            'tagline' => ['nullable', 'array'],
            'logo' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'whatsapp' => ['nullable', 'string'],
            'email' => ['nullable', 'string'],
            'address' => ['nullable', 'array'],
            'working_hours' => ['nullable', 'array'],
            'social' => ['nullable', 'array'],
        ]);

        $setting = Setting::firstOrCreate(['id' => 1]);
        $setting->update($data);

        return response()->json($setting);
    }
}
