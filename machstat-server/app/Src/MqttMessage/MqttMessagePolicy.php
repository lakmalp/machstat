<?php

namespace App\Src\MqttMessage;

use App\Models\User;

class MqttMessagePolicy
{
    public function createMqttMessage(User $user)
    {
        return true;
    }
    public function editMqttMessage(User $user)
    {
        return true;
    }
}
