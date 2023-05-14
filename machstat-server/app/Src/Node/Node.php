<?php

namespace App\Src\Node;

use Illuminate\Database\Eloquent\Model;

class Node extends Model {
    public static $nodeStatuses = ['NotConfigurred', 'Offline', 'Online', 'Suspended'];
    protected $fillable = [
        'guid',
        'status',
    ];
}