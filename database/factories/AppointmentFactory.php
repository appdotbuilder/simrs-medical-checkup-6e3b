<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Appointment>
 */
class AppointmentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'patient_id' => Patient::factory(),
            'appointment_number' => Appointment::generateAppointmentNumber(),
            'appointment_date' => $this->faker->dateTimeBetween('now', '+30 days'),
            'type' => $this->faker->randomElement([
                'General Check-up',
                'Blood Test',
                'Blood Pressure Check',
                'Diabetes Screening',
                'Cholesterol Test',
                'Eye Examination',
                'Dental Check-up',
                'Heart Check-up',
                'Skin Examination',
                'X-Ray'
            ]),
            'notes' => $this->faker->optional(0.6)->sentence(),
            'status' => $this->faker->randomElement(['scheduled', 'in_progress', 'completed', 'cancelled']),
            'created_by' => User::factory(),
        ];
    }

    /**
     * Indicate that the appointment is scheduled.
     */
    public function scheduled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'scheduled',
            'appointment_date' => $this->faker->dateTimeBetween('now', '+30 days'),
        ]);
    }

    /**
     * Indicate that the appointment is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'appointment_date' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ]);
    }

    /**
     * Indicate that the appointment is today.
     */
    public function today(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'scheduled',
            'appointment_date' => $this->faker->dateTimeBetween('today', 'today +8 hours'),
        ]);
    }
}