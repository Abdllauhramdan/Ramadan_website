<?php

namespace App\Services;

use App\Models\ContactSetting;

class ContactSettingService
{
    public function show(): ContactSetting
    {
        return ContactSetting::firstOrCreate(['id' => 1]);
    }

    public function update(array $data): ContactSetting
    {
        $contact = ContactSetting::firstOrCreate(['id' => 1]);
        $contact->update($data);

        return $contact;
    }
}
