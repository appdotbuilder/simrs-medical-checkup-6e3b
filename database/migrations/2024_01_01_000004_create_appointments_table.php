<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->string('appointment_number')->unique()->comment('Unique appointment number');
            $table->datetime('appointment_date')->comment('Scheduled appointment date and time');
            $table->string('type')->comment('Type of check-up (general, dental, eye, etc.)');
            $table->text('notes')->nullable()->comment('Additional notes for appointment');
            $table->enum('status', ['scheduled', 'in_progress', 'completed', 'cancelled'])->default('scheduled')->comment('Appointment status');
            $table->foreignId('created_by')->constrained('users');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('appointment_number');
            $table->index('appointment_date');
            $table->index('type');
            $table->index(['status', 'appointment_date']);
            $table->index(['patient_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};