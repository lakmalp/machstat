<?php

namespace App\Src\Node;

use App\Models\User;

class NodePolicy
{
    public function createNode(User $user)
    {
        return true;
    }
}
