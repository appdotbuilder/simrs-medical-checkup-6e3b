<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Patient
 *
 * @property int $id
 * @property string $medical_record_number
 * @property string $name
 * @property \Illuminate\Support\Carbon $date_of_birth
 * @property string $gender
 * @property string|null $phone
 * @property string|null $email
 * @property string|null $address
 * @property string|null $emergency_contact_name
 * @property string|null $emergency_contact_phone
 * @property string|null $medical_history
 * @property string|null $allergies
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Appointment> $appointments
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Examination> $examinations
 * @property-read int $age
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Patient newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Patient newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Patient query()
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereAllergies($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereDateOfBirth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereEmergencyContactName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereEmergencyContactPhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereMedicalHistory($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereMedicalRecordNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Patient active()
 * @method static \Database\Factories\PatientFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Patient extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'medical_record_number',
        'name',
        'date_of_birth',
        'gender',
        'phone',
        'email',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_history',
        'allergies',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'date_of_birth' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the appointments for the patient.
     */
    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class);
    }

    /**
     * Get the examinations for the patient.
     */
    public function examinations(): HasMany
    {
        return $this->hasMany(Examination::class);
    }

    /**
     * Get the patient's age.
     *
     * @return int
     */
    public function getAgeAttribute(): int
    {
        return (int) $this->date_of_birth->diffInYears(now());
    }

    /**
     * Scope a query to only include active patients.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Generate a unique medical record number.
     *
     * @return string
     */
    public static function generateMedicalRecordNumber(): string
    {
        do {
            $number = 'MR' . date('Y') . str_pad((string) random_int(1, 9999), 4, '0', STR_PAD_LEFT);
        } while (static::where('medical_record_number', $number)->exists());

        return $number;
    }
}