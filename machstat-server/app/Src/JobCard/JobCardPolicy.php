<?php

namespace App\Src\JobCard;

use App\Models\User;

class JobCardPolicy
{
    public function createJobCard(User $user)
    {
        return true;
    }
    public function editJobCard(User $user)
    {
        return true;
    }
}
