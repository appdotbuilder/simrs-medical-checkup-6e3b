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
        Schema::create('examinations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('appointment_id')->constrained()->onDelete('cascade');
            $table->foreignId('patient_id')->constrained()->onDelete('cascade');
            $table->string('examination_type')->comment('Type of examination performed');
            $table->decimal('height', 5, 2)->nullable()->comment('Patient height in cm');
            $table->decimal('weight', 5, 2)->nullable()->comment('Patient weight in kg');
            $table->string('blood_pressure')->nullable()->comment('Blood pressure reading');
            $table->integer('heart_rate')->nullable()->comment('Heart rate in BPM');
            $table->decimal('temperature', 4, 1)->nullable()->comment('Body temperature in Celsius');
            $table->text('symptoms')->nullable()->comment('Patient symptoms description');
            $table->text('diagnosis')->nullable()->comment('Medical diagnosis');
            $table->text('treatment')->nullable()->comment('Prescribed treatment');
            $table->text('recommendations')->nullable()->comment('Medical recommendations');
            $table->text('notes')->nullable()->comment('Additional examination notes');
            $table->enum('status', ['pending', 'completed'])->default('pending')->comment('Examination status');
            $table->foreignId('examined_by')->constrained('users');
            $table->timestamp('examination_date')->comment('Date and time of examination');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('examination_type');
            $table->index('examination_date');
            $table->index(['patient_id', 'examination_date']);
            $table->index(['status', 'examination_date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('examinations');
    }
};