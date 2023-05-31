<?php

namespace App\Src\Device;

use App\Models\User;

class DevicePolicy
{
    public function createDevice(User $user)
    {
        return true;
    }
    public function editDevice(User $user)
    {
        return true;
    }
}
