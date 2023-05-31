<?php

namespace App\Src\Device;

use Illuminate\Database\Eloquent\Model;

class Device extends Model {
    protected $fillable = [
        'name',
        'node_id',
    ];
}