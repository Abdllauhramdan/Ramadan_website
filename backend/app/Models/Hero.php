<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Hero extends Model
{
    protected $guarded = [];

    protected $casts = [
        'badge' => 'array',
        'title' => 'array',
        'subtitle' => 'array',
        'cta_primary' => 'array',
        'cta_secondary' => 'array',
    ];
}
