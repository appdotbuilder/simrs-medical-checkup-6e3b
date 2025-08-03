<?php

use App\Http\Controllers\AppointmentController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ExaminationController;
use App\Http\Controllers\PatientController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Welcome page showcasing SIMRS Medical Check-up system
Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Patient management
    Route::resource('patients', PatientController::class);
    
    // Appointment management
    Route::resource('appointments', AppointmentController::class);
    
    // Examination management
    Route::resource('examinations', ExaminationController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
