<?php

namespace App\Src\Company;

use App\Models\User;

class CompanyPolicy
{
    public function createCompany(User $user)
    {
        return true;
    }
    public function editCompany(User $user)
    {
        return true;
    }
}
