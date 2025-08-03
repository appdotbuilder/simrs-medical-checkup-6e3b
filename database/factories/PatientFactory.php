<?php

namespace Database\Factories;

use App\Models\Patient;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Patient>
 */
class PatientFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'medical_record_number' => Patient::generateMedicalRecordNumber(),
            'name' => $this->faker->name(),
            'date_of_birth' => $this->faker->dateTimeBetween('-80 years', '-18 years')->format('Y-m-d'),
            'gender' => $this->faker->randomElement(['male', 'female']),
            'phone' => $this->faker->optional(0.8)->phoneNumber(),
            'email' => $this->faker->optional(0.6)->unique()->safeEmail(),
            'address' => $this->faker->optional(0.7)->address(),
            'emergency_contact_name' => $this->faker->optional(0.8)->name(),
            'emergency_contact_phone' => $this->faker->optional(0.8)->phoneNumber(),
            'medical_history' => $this->faker->optional(0.4)->paragraph(),
            'allergies' => $this->faker->optional(0.3)->randomElement([
                'No known allergies',
                'Penicillin allergy',
                'Peanut allergy',
                'Shellfish allergy',
                'Latex allergy',
                'Dust mite allergy'
            ]),
            'status' => $this->faker->randomElement(['active', 'inactive']),
        ];
    }

    /**
     * Indicate that the patient is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the patient is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }
}