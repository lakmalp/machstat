<?php

namespace App\Src\Equipment;

use App\Src\EquipmentType\EquipmentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Equipment extends Model {
    protected $fillable = [
        'code',
        'description',
        'equipment_type_id',
    ];

    public function equipmentType(): BelongsTo
    {
        return $this->belongsTo(EquipmentType::class);
    }
}