<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactSetting extends Model
{
    protected $guarded = [];

    protected $casts = [
        'title' => 'array',
        'subtitle' => 'array',
    ];
}
