import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Patients', href: '/patients' },
    { title: 'Register New Patient', href: '/patients/create' },
];

export default function CreatePatient() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergency_contact_name: '',
        emergency_contact_phone: '',
        medical_history: '',
        allergies: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('patients.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register New Patient - SIMRS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">➕ Register New Patient</h1>
                        <p className="text-gray-600 mt-1">Add a new patient to the system</p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href="/patients">← Back to Patients</Link>
                    </Button>
                </div>

                {/* Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <form onSubmit={submit} className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">👤 Personal Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <Label htmlFor="name">Full Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className="mt-1"
                                        required
                                    />
                                    {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="date_of_birth">Date of Birth *</Label>
                                    <Input
                                        id="date_of_birth"
                                        type="date"
                                        value={data.date_of_birth}
                                        onChange={(e) => setData('date_of_birth', e.target.value)}
                                        className="mt-1"
                                        required
                                    />
                                    {errors.date_of_birth && <p className="text-red-600 text-sm mt-1">{errors.date_of_birth}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="gender">Gender *</Label>
                                    <Select onValueChange={(value) => setData('gender', value)} required>
                                        <SelectTrigger className="mt-1">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">👨 Male</SelectItem>
                                            <SelectItem value="female">👩 Female</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.gender && <p className="text-red-600 text-sm mt-1">{errors.gender}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">📞 Contact Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        className="mt-1"
                                        placeholder="e.g., +62 812 3456 7890"
                                    />
                                    {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="email">Email Address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="mt-1"
                                        placeholder="patient@example.com"
                                    />
                                    {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="address">Address</Label>
                                    <Textarea
                                        id="address"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                        placeholder="Patient's full address"
                                    />
                                    {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Emergency Contact */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">🚨 Emergency Contact</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
                                    <Input
                                        id="emergency_contact_name"
                                        type="text"
                                        value={data.emergency_contact_name}
                                        onChange={(e) => setData('emergency_contact_name', e.target.value)}
                                        className="mt-1"
                                        placeholder="Contact person's name"
                                    />
                                    {errors.emergency_contact_name && <p className="text-red-600 text-sm mt-1">{errors.emergency_contact_name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
                                    <Input
                                        id="emergency_contact_phone"
                                        type="tel"
                                        value={data.emergency_contact_phone}
                                        onChange={(e) => setData('emergency_contact_phone', e.target.value)}
                                        className="mt-1"
                                        placeholder="Emergency contact phone"
                                    />
                                    {errors.emergency_contact_phone && <p className="text-red-600 text-sm mt-1">{errors.emergency_contact_phone}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Medical Information */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">🏥 Medical Information</h3>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="medical_history">Medical History</Label>
                                    <Textarea
                                        id="medical_history"
                                        value={data.medical_history}
                                        onChange={(e) => setData('medical_history', e.target.value)}
                                        className="mt-1"
                                        rows={4}
                                        placeholder="Previous medical conditions, surgeries, etc."
                                    />
                                    {errors.medical_history && <p className="text-red-600 text-sm mt-1">{errors.medical_history}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="allergies">Allergies</Label>
                                    <Textarea
                                        id="allergies"
                                        value={data.allergies}
                                        onChange={(e) => setData('allergies', e.target.value)}
                                        className="mt-1"
                                        rows={3}
                                        placeholder="Known allergies (medications, food, etc.)"
                                    />
                                    {errors.allergies && <p className="text-red-600 text-sm mt-1">{errors.allergies}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
                            <Button variant="outline" asChild>
                                <Link href="/patients">Cancel</Link>
                            </Button>
                            <Button 
                                type="submit" 
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700"
                            >
                                {processing ? 'Registering...' : '✅ Register Patient'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}