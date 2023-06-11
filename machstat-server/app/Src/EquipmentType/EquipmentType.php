<?php

namespace App\Src\EquipmentType;

use Illuminate\Database\Eloquent\Model;

class EquipmentType extends Model {
    protected $fillable = [
        'code',
        'description',
    ];
}