<?php

namespace App\Src\MqttMessage;

use App\Src\Node\Node;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MqttMessage extends Model {
    protected $fillable = [
        'guid',
        'body',
        'received_at',
        'processed'
    ];
}