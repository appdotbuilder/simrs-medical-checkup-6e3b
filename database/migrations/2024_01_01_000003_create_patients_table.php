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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string('medical_record_number')->unique()->comment('Unique medical record number');
            $table->string('name')->comment('Patient full name');
            $table->date('date_of_birth')->comment('Patient date of birth');
            $table->enum('gender', ['male', 'female'])->comment('Patient gender');
            $table->string('phone')->nullable()->comment('Patient phone number');
            $table->string('email')->nullable()->comment('Patient email address');
            $table->text('address')->nullable()->comment('Patient address');
            $table->string('emergency_contact_name')->nullable()->comment('Emergency contact name');
            $table->string('emergency_contact_phone')->nullable()->comment('Emergency contact phone');
            $table->text('medical_history')->nullable()->comment('Patient medical history notes');
            $table->text('allergies')->nullable()->comment('Patient allergies information');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Patient status');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('medical_record_number');
            $table->index('name');
            $table->index('date_of_birth');
            $table->index(['status', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};