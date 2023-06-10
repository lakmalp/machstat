<?php

namespace App\Src\Company;

use App\Src\Site\Site;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model {
    protected $fillable = [
        'code',
        'description',
    ];

    public function sites(): HasMany
    {
        return $this->hasMany(Site::class);
    }
}