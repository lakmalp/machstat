<?php

namespace App\Src\Device;

use App\Src\Node\Node;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Device extends Model {
    protected $fillable = [
        'name',
        'node_ref',
    ];

    public function node(): BelongsTo
    {
        return $this->belongsTo(Node::class, 'node_ref');
    }
}