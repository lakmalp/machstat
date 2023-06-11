<?php

namespace App\Src\JobCard;

use Illuminate\Http\Request;

use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class JobCardRepository
{
    public function createJobCard(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $jobCard = new JobCard;
            $jobCard->fill($validated);
            $jobCard->save();
            $jobCard->refresh();

            return $jobCard;
        });
    }

    public function updateJobCard(JobCard $jobCard, array $validated)
    {
        return DB::transaction(function () use ($validated, $jobCard) {
            $jobCard->fill($validated);
            $jobCard->save();
            $jobCard->refresh();

            return $jobCard;
        });
    }
}
