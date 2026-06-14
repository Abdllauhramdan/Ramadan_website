<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    protected $casts = [
        'title' => 'array',
        'location' => 'array',
        'description' => 'array',
    ];
}
