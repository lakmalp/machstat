<?php

namespace App\Src\Site;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SiteRepository
{
    public function createSite(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $site = new Site;
            $site->fill($validated);
            $site->save();
            $site->refresh();

            return $site;
        });
    }

    public function updateSite(Site $site, array $validated)
    {
        return DB::transaction(function () use ($validated, $site) {
            $site->fill($validated);
            $site->save();
            $site->refresh();

            return $site;
        });
    }
}
