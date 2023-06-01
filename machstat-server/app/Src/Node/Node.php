<?php

namespace App\Src\Node;

use App\Src\Device\Device;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Node extends Model {
    public static $nodeStatuses = ['NotConfigurred', 'Offline', 'Online', 'Suspended'];
    protected $fillable = [
        'guid',
        'status',
    ];

    public function device(): HasOne
    {
        return $this->hasOne(Device::class);
    }
}