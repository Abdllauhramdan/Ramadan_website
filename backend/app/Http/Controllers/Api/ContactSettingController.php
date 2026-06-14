<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactSetting;
use Illuminate\Http\Request;

class ContactSettingController extends Controller
{
    public function show()
    {
        return response()->json(ContactSetting::firstOrCreate(['id' => 1]));
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'title' => ['nullable', 'array'],
            'subtitle' => ['nullable', 'array'],
        ]);

        $contact = ContactSetting::firstOrCreate(['id' => 1]);
        $contact->update($data);

        return response()->json($contact);
    }
}
