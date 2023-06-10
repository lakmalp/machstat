<?php

namespace App\Src\Site;

use App\Models\User;

class SitePolicy
{
    public function createSite(User $user)
    {
        return true;
    }
    public function editSite(User $user)
    {
        return true;
    }
}
