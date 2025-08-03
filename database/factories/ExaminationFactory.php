<?php

namespace Database\Factories;

use App\Models\Appointment;
use App\Models\Examination;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Examination>
 */
class ExaminationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $appointment = Appointment::factory()->create();
        
        return [
            'appointment_id' => $appointment->id,
            'patient_id' => $appointment->patient_id,
            'examination_type' => $this->faker->randomElement([
                'General Physical Examination',
                'Blood Pressure Check',
                'Blood Test Analysis',
                'Diabetes Screening',
                'Cholesterol Assessment',
                'Eye Examination',
                'Heart Rate Monitoring',
                'Weight Assessment',
                'Skin Examination',
                'Respiratory Check'
            ]),
            'height' => $this->faker->optional(0.9)->numberBetween(150, 190),
            'weight' => $this->faker->optional(0.9)->numberBetween(45, 120),
            'blood_pressure' => $this->faker->optional(0.8)->randomElement([
                '120/80', '130/85', '110/70', '140/90', '125/82', '115/75'
            ]),
            'heart_rate' => $this->faker->optional(0.8)->numberBetween(60, 100),
            'temperature' => $this->faker->optional(0.7)->randomFloat(1, 36.0, 37.5),
            'symptoms' => $this->faker->optional(0.6)->randomElement([
                'No symptoms reported',
                'Mild headache',
                'Fatigue',
                'Chest pain',
                'Shortness of breath',
                'Dizziness',
                'Nausea',
                'Back pain',
                'Joint pain'
            ]),
            'diagnosis' => $this->faker->optional(0.8)->randomElement([
                'Normal examination',
                'Hypertension',
                'Pre-diabetes',
                'Healthy weight',
                'Minor infection',
                'Seasonal allergies',
                'Mild dehydration',
                'Normal vital signs',
                'Requires follow-up'
            ]),
            'treatment' => $this->faker->optional(0.7)->randomElement([
                'No treatment required',
                'Lifestyle modification recommended',
                'Prescribed medication',
                'Follow-up in 3 months',
                'Diet and exercise program',
                'Rest and hydration',
                'Monitor blood pressure',
                'Annual check-up recommended'
            ]),
            'recommendations' => $this->faker->optional(0.8)->randomElement([
                'Maintain healthy lifestyle',
                'Regular exercise recommended',
                'Monitor blood pressure regularly',
                'Follow balanced diet',
                'Stay hydrated',
                'Get adequate sleep',
                'Reduce stress levels',
                'Schedule follow-up appointment'
            ]),
            'notes' => $this->faker->optional(0.5)->sentence(),
            'status' => $this->faker->randomElement(['pending', 'completed']),
            'examined_by' => User::factory(),
            'examination_date' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ];
    }

    /**
     * Indicate that the examination is completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'completed',
            'examination_date' => $this->faker->dateTimeBetween('-30 days', 'now'),
        ]);
    }

    /**
     * Indicate that the examination is pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'pending',
            'examination_date' => $this->faker->dateTimeBetween('now', '+7 days'),
        ]);
    }
}