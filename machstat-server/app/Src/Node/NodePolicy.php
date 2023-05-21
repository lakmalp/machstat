<?php

namespace App\Src\Node;

use App\Models\User;

class NodePolicy
{
    public function createNode(User $user)
    {
        return true;
    }
    public function editNode(User $user)
    {
        return true;
    }
}
