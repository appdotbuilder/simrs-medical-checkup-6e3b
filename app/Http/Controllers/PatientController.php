<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Requests\UpdatePatientRequest;
use App\Models\Patient;
use Inertia\Inertia;

class PatientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $patients = Patient::with(['appointments' => function ($query) {
            $query->upcoming()->latest('appointment_date')->limit(3);
        }])
        ->latest()
        ->paginate(10);
        
        return Inertia::render('patients/index', [
            'patients' => $patients
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('patients/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePatientRequest $request)
    {
        $validated = $request->validated();
        $validated['medical_record_number'] = Patient::generateMedicalRecordNumber();
        
        $patient = Patient::create($validated);

        return redirect()->route('patients.show', $patient)
            ->with('success', 'Patient registered successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Patient $patient)
    {
        $patient->load([
            'appointments' => function ($query) {
                $query->with('examinations')->latest('appointment_date');
            },
            'examinations' => function ($query) {
                $query->with(['appointment', 'examiner'])->latest('examination_date')->limit(10);
            }
        ]);

        return Inertia::render('patients/show', [
            'patient' => $patient
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Patient $patient)
    {
        return Inertia::render('patients/edit', [
            'patient' => $patient
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePatientRequest $request, Patient $patient)
    {
        $patient->update($request->validated());

        return redirect()->route('patients.show', $patient)
            ->with('success', 'Patient information updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Patient $patient)
    {
        $patient->delete();

        return redirect()->route('patients.index')
            ->with('success', 'Patient deleted successfully.');
    }
}