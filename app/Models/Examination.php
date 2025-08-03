<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Examination
 *
 * @property int $id
 * @property int $appointment_id
 * @property int $patient_id
 * @property string $examination_type
 * @property float|null $height
 * @property float|null $weight
 * @property string|null $blood_pressure
 * @property int|null $heart_rate
 * @property float|null $temperature
 * @property string|null $symptoms
 * @property string|null $diagnosis
 * @property string|null $treatment
 * @property string|null $recommendations
 * @property string|null $notes
 * @property string $status
 * @property int $examined_by
 * @property \Illuminate\Support\Carbon $examination_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Appointment $appointment
 * @property-read \App\Models\Patient $patient
 * @property-read \App\Models\User $examiner
 * @property-read float|null $bmi
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Examination newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Examination newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Examination query()
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereAppointmentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereBloodPressure($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereDiagnosis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereExaminationDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereExaminationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereExaminedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereHeartRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereHeight($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination wherePatientId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereRecommendations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereSymptoms($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereTemperature($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereTreatment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Examination whereWeight($value)
 * @method static \Database\Factories\ExaminationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Examination extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'appointment_id',
        'patient_id',
        'examination_type',
        'height',
        'weight',
        'blood_pressure',
        'heart_rate',
        'temperature',
        'symptoms',
        'diagnosis',
        'treatment',
        'recommendations',
        'notes',
        'status',
        'examined_by',
        'examination_date',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'height' => 'decimal:2',
        'weight' => 'decimal:2',
        'temperature' => 'decimal:1',
        'heart_rate' => 'integer',
        'examination_date' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the appointment that owns the examination.
     */
    public function appointment(): BelongsTo
    {
        return $this->belongsTo(Appointment::class);
    }

    /**
     * Get the patient that owns the examination.
     */
    public function patient(): BelongsTo
    {
        return $this->belongsTo(Patient::class);
    }

    /**
     * Get the user who performed the examination.
     */
    public function examiner(): BelongsTo
    {
        return $this->belongsTo(User::class, 'examined_by');
    }

    /**
     * Calculate BMI from height and weight.
     *
     * @return float|null
     */
    public function getBmiAttribute(): ?float
    {
        if (!$this->height || !$this->weight) {
            return null;
        }

        $heightInMeters = $this->height / 100;
        return round($this->weight / ($heightInMeters * $heightInMeters), 2);
    }
}