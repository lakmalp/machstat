<?php

namespace App\Src\MqttMessage;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class MqttMessageRepository
{
    public function createMqttMessage(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $mqttMessage = new MqttMessage;
            $mqttMessage->fill($validated);
            $mqttMessage->save();
            $mqttMessage->refresh();

            return $mqttMessage;
        });
    }

    public function updateMqttMessage(MqttMessage $mqttMessage, array $validated)
    {
        return DB::transaction(function () use ($validated, $mqttMessage) {
            $mqttMessage->fill($validated);
            $mqttMessage->save();
            $mqttMessage->refresh();

            return $mqttMessage;
        });
    }
}
