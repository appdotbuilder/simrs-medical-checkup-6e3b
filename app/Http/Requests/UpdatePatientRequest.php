<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePatientRequest extends FormRequest
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
            'name' => 'required|string|max:255',
            'date_of_birth' => 'required|date|before:today',
            'gender' => 'required|in:male,female',
            'phone' => 'nullable|string|max:20',
            'email' => 'nullable|email|unique:patients,email,' . $this->route('patient')->id,
            'address' => 'nullable|string',
            'emergency_contact_name' => 'nullable|string|max:255',
            'emergency_contact_phone' => 'nullable|string|max:20',
            'medical_history' => 'nullable|string',
            'allergies' => 'nullable|string',
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
            'name.required' => 'Patient name is required.',
            'date_of_birth.required' => 'Date of birth is required.',
            'date_of_birth.date' => 'Please provide a valid date of birth.',
            'date_of_birth.before' => 'Date of birth must be before today.',
            'gender.required' => 'Gender is required.',
            'gender.in' => 'Gender must be either male or female.',
            'email.email' => 'Please provide a valid email address.',
            'email.unique' => 'This email is already registered to another patient.',
        ];
    }
}