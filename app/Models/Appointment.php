<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Appointment
 *
 * @property int $id
 * @property int $patient_id
 * @property string $appointment_number
 * @property \Illuminate\Support\Carbon $appointment_date
 * @property string $type
 * @property string|null $notes
 * @property string $status
 * @property int $created_by
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Patient $patient
 * @property-read \App\Models\User $creator
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Examination> $examinations
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereAppointmentDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereAppointmentNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment upcoming()
 * @method static \Illuminate\Database\Eloquent\Builder|Appointment today()
 * @method static \Database\Factories\AppointmentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Appointment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'patient_id',
        'appointment_number',
        'appointment_date',
        'type',
        'notes',
        'status',
        'created_by',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'appointment_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the patient that owns the appointment.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Get the user who created the appointment.
     */
    public function creator(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Get the examinations for the appointment.
     */
    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class);
    }

    /**
     * Scope a query to only include upcoming appointments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeUpcoming($query)
    {
        return $query->where('appointment_date', '>=', now())
                    ->where('status', '!=', 'cancelled');
    }

    /**
     * Scope a query to only include today's appointments.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeToday($query)
    {
        return $query->whereDate('appointment_date', today());
    }

    /**
     * Generate a unique appointment number.
     *
     * @return string
     */
    public static function generateAppointmentNumber(): string
    {
        do {
            $number = 'APT' . date('Ymd') . str_pad((string) random_int(1, 999), 3, '0', STR_PAD_LEFT);
        } while (static::where('appointment_number', $number)->exists());

        return $number;
    }
}