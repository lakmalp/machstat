<?php

namespace App\Src\Node;

use App\Models\BaseModel;
use Illuminate\Database\Eloquent\Model;

class Node extends BaseModel {
    protected $fillable = [
        'guid',
        'status',
    ];
}