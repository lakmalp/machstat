<?php

namespace App\Src\EquipmentType;

use App\Src\Equipment\Equipment;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class EquipmentType extends Model {
    protected $fillable = [
        'code',
        'description',
    ];

    public function equipment(): HasMany
    {
        return $this->hasMany(Equipment::class);
    }
}