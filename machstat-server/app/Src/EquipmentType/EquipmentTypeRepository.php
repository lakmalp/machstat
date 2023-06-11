<?php

namespace App\Src\EquipmentType;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EquipmentTypeRepository
{
    public function createEquipmentType(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $equipmentType = new EquipmentType;
            $equipmentType->fill($validated);
            $equipmentType->save();
            $equipmentType->refresh();

            return $equipmentType;
        });
    }

    public function updateEquipmentType(EquipmentType $equipmentType, array $validated)
    {
        return DB::transaction(function () use ($validated, $equipmentType) {
            $equipmentType->fill($validated);
            $equipmentType->save();
            $equipmentType->refresh();

            return $equipmentType;
        });
    }
}
