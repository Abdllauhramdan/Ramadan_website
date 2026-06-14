<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    protected $guarded = [];

    protected $casts = [
        'name' => 'array',
        'tagline' => 'array',
        'address' => 'array',
        'working_hours' => 'array',
        'social' => 'array',
    ];
}
