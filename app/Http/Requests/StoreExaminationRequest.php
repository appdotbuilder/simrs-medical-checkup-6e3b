<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreExaminationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'appointment_id' => 'required|exists:appointments,id',
            'patient_id' => 'required|exists:patients,id',
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
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'appointment_id.required' => 'Appointment is required.',
            'appointment_id.exists' => 'The selected appointment does not exist.',
            'patient_id.required' => 'Patient is required.',
            'patient_id.exists' => 'The selected patient does not exist.',
            'examination_type.required' => 'Examination type is required.',
            'height.numeric' => 'Height must be a valid number.',
            'height.min' => 'Height must be greater than 0.',
            'height.max' => 'Height cannot exceed 300 cm.',
            'weight.numeric' => 'Weight must be a valid number.',
            'weight.min' => 'Weight must be greater than 0.',
            'weight.max' => 'Weight cannot exceed 500 kg.',
            'heart_rate.integer' => 'Heart rate must be a whole number.',
            'heart_rate.min' => 'Heart rate must be at least 30 BPM.',
            'heart_rate.max' => 'Heart rate cannot exceed 200 BPM.',
            'temperature.numeric' => 'Temperature must be a valid number.',
            'temperature.min' => 'Temperature must be at least 30°C.',
            'temperature.max' => 'Temperature cannot exceed 45°C.',
        ];
    }
}