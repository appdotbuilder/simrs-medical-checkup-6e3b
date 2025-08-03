<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreExaminationRequest;
use App\Models\Appointment;
use App\Models\Examination;
use App\Models\Patient;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExaminationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $examinations = Examination::with(['patient', 'appointment', 'examiner'])
            ->latest('examination_date')
            ->paginate(15);
        
        return Inertia::render('examinations/index', [
            'examinations' => $examinations
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $appointments = Appointment::with('patient')
            ->where('status', '!=', 'cancelled')
            ->orderBy('appointment_date')
            ->get();

        return Inertia::render('examinations/create', [
            'appointments' => $appointments
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreExaminationRequest $request)
    {
        $validated = $request->validated();
        $validated['examined_by'] = auth()->id();
        $validated['examination_date'] = now();
        
        $examination = Examination::create($validated);

        // Update appointment status to completed if examination is completed
        if ($examination->status === 'completed') {
            $examination->appointment->update(['status' => 'completed']);
        }

        return redirect()->route('examinations.show', $examination)
            ->with('success', 'Examination results saved successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Examination $examination)
    {
        $examination->load(['patient', 'appointment', 'examiner']);

        return Inertia::render('examinations/show', [
            'examination' => $examination
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Examination $examination)
    {
        $examination->load(['patient', 'appointment']);

        return Inertia::render('examinations/edit', [
            'examination' => $examination
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Examination $examination)
    {
        $validated = $request->validate([
            'examination_type' => 'required|string|max:255',
            'height' => 'nullable|numeric|min:0|max:300',
            'weight' => 'nullable|numeric|min:0|max:500',
            'blood_pressure' => 'nullable|string|max:20',
            'heart_rate' => 'nullable|integer|min:30|max:200',
            'temperature' => 'nullable|numeric|min:30|max:45',
            'symptoms' => 'nullable|string',
            'diagnosis' => 'nullable|string',
            'treatment' => 'nullable|string',
            'recommendations' => 'nullable|string',
            'notes' => 'nullable|string',
            'status' => 'required|in:pending,completed',
        ]);

        $examination->update($validated);

        // Update appointment status if examination is completed
        if ($examination->status === 'completed') {
            $examination->appointment->update(['status' => 'completed']);
        }

        return redirect()->route('examinations.show', $examination)
            ->with('success', 'Examination updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Examination $examination)
    {
        $examination->delete();

        return redirect()->route('examinations.index')
            ->with('success', 'Examination deleted successfully.');
    }
}