<?php

namespace App\Src\Equipment;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class EquipmentRepository
{
    public function createEquipment(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $equipment = new Equipment;
            $equipment->fill($validated);
            $equipment->save();
            $equipment->refresh();

            return $equipment;
        });
    }

    public function updateEquipment(Equipment $equipment, array $validated)
    {
        return DB::transaction(function () use ($validated, $equipment) {
            $equipment->fill($validated);
            $equipment->save();
            $equipment->refresh();

            return $equipment;
        });
    }
}
