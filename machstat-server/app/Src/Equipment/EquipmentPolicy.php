<?php

namespace App\Src\Equipment;

use App\Models\User;

class EquipmentPolicy
{
    public function createEquipment(User $user)
    {
        return true;
    }
    public function editEquipment(User $user)
    {
        return true;
    }
}
