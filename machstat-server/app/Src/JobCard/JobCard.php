<?php

namespace App\Src\JobCard;

use App\Src\EquipmentType\EquipmentType;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class JobCard extends Model
{
    protected $fillable = [
        'description',
        'schedule_date',
        'actual_date',
        'site_ref',
        'work_start_time',
        'work_completed_time',
        'time_taken',
        'machine_shutoff_at',
        'machine_started_at',
        'status',
        'notes',
        'owner_user_ref',
        'authorizer_user_ref',
        'is_manual'
    ];

    protected $casts = [
        'schedule_date' => 'date',
        'actual_date' => 'date',
        'work_start_time' => 'timestamp',
        'work_completed_time' => 'timestamp',
        'machine_shutoff_at' => 'timestamp',
        'machine_started_at' => 'timestamp',
        'is_manual' => 'boolean'
    ];

    public function equipmentType(): BelongsTo
    {
        return $this->belongsTo(EquipmentType::class);
    }
}
