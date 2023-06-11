<?php

namespace App\Src\EquipmentType;

use App\Models\User;

class EquipmentTypePolicy
{
    public function createEquipmentType(User $user)
    {
        return true;
    }
    public function editEquipmentType(User $user)
    {
        return true;
    }
}
