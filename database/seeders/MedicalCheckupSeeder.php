<?php

namespace Database\Seeders;

use App\Models\Appointment;
use App\Models\Examination;
use App\Models\Patient;
use App\Models\User;
use Illuminate\Database\Seeder;

class MedicalCheckupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create medical staff users
        $doctor = User::factory()->create([
            'name' => 'Dr. Sarah Johnson',
            'email' => 'doctor@simrs.com',
        ]);

        $nurse = User::factory()->create([
            'name' => 'Nurse Maria Garcia',
            'email' => 'nurse@simrs.com',
        ]);

        $admin = User::factory()->create([
            'name' => 'Admin John Smith',
            'email' => 'admin@simrs.com',
        ]);

        // Create patients
        $patients = Patient::factory(50)->create();

        // Create appointments for patients
        foreach ($patients->take(30) as $patient) {
            // Create 1-3 appointments per patient
            $appointmentCount = random_int(1, 3);
            
            for ($i = 0; $i < $appointmentCount; $i++) {
                $appointment = Appointment::factory()->create([
                    'patient_id' => $patient->id,
                    'created_by' => collect([$doctor->id, $nurse->id, $admin->id])->random(),
                ]);

                // 70% chance to have an examination for completed appointments
                if ($appointment->status === 'completed' && random_int(1, 100) <= 70) {
                    Examination::factory()->completed()->create([
                        'appointment_id' => $appointment->id,
                        'patient_id' => $patient->id,
                        'examined_by' => collect([$doctor->id, $nurse->id])->random(),
                    ]);
                }
            }
        }

        // Create some today's appointments
        foreach ($patients->take(8) as $patient) {
            Appointment::factory()->today()->create([
                'patient_id' => $patient->id,
                'created_by' => collect([$doctor->id, $nurse->id, $admin->id])->random(),
            ]);
        }

        // Create some pending examinations
        foreach ($patients->take(5) as $patient) {
            $appointment = Appointment::factory()->create([
                'patient_id' => $patient->id,
                'status' => 'in_progress',
                'created_by' => collect([$doctor->id, $nurse->id, $admin->id])->random(),
            ]);

            Examination::factory()->pending()->create([
                'appointment_id' => $appointment->id,
                'patient_id' => $patient->id,
                'examined_by' => collect([$doctor->id, $nurse->id])->random(),
            ]);
        }

        $this->command->info('Medical check-up system seeded with sample data!');
        $this->command->info('Created:');
        $this->command->info('- ' . Patient::count() . ' patients');
        $this->command->info('- ' . Appointment::count() . ' appointments');
        $this->command->info('- ' . Examination::count() . ' examinations');
        $this->command->info('- 3 medical staff users');
    }
}