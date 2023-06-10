<?php

namespace App\Src\Company;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CompanyRepository
{
    public function createCompany(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $company = new Company;
            $company->fill($validated);
            $company->save();
            $company->refresh();

            return $company;
        });
    }

    public function updateCompany(Company $company, array $validated)
    {
        return DB::transaction(function () use ($validated, $company) {
            $company->fill($validated);
            $company->save();
            $company->refresh();

            return $company;
        });
    }
}
