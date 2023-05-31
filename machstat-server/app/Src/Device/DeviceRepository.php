<?php

namespace App\Src\Device;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class DeviceRepository
{
    public function createDevice(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $device = new Device;
            $device->fill($validated);
            $device->save();
            $device->refresh();

            return $device;
        });
    }

    public function updateDevice(Device $device, array $validated)
    {
        return DB::transaction(function () use ($validated, $device) {
            $device->fill($validated);
            $device->save();
            $device->refresh();

            return $device;
        });
    }
}
