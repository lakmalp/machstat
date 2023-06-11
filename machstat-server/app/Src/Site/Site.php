<?php

namespace App\Src\Site;

use App\Src\Company\Company;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Site extends Model {
    protected $fillable = [
        'code',
        'description',
        'company_ref'
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class, 'company_ref');
    }
}