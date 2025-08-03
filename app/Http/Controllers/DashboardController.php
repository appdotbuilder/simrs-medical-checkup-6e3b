<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Appointment;
use App\Models\Examination;
use App\Models\Patient;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $stats = [
            'total_patients' => Patient::count(),
            'active_patients' => Patient::active()->count(),
            'upcoming_appointments' => Appointment::upcoming()->count(),
            'today_appointments' => Appointment::today()->count(),
            'completed_examinations' => Examination::where('status', 'completed')->count(),
            'pending_examinations' => Examination::where('status', 'pending')->count(),
        ];

        $upcomingAppointments = Appointment::with(['patient'])
            ->upcoming()
            ->orderBy('appointment_date')
            ->limit(10)
            ->get();

        $recentExaminations = Examination::with(['patient', 'appointment', 'examiner'])
            ->where('status', 'completed')
            ->latest('examination_date')
            ->limit(10)
            ->get();

        $todayAppointments = Appointment::with(['patient'])
            ->today()
            ->orderBy('appointment_date')
            ->get();

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'upcomingAppointments' => $upcomingAppointments,
            'recentExaminations' => $recentExaminations,
            'todayAppointments' => $todayAppointments,
        ]);
    }
}