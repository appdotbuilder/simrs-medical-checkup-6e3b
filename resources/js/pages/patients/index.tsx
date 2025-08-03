import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Patient {
    id: number;
    medical_record_number: string;
    name: string;
    date_of_birth: string;
    gender: string;
    phone: string | null;
    email: string | null;
    status: string;
    created_at: string;
    appointments: Array<{
        id: number;
        appointment_date: string;
        type: string;
        status: string;
    }>;
}

interface Props {
    patients: {
        data: Patient[];
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        meta: {
            total: number;
            current_page: number;
            last_page: number;
        };
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Patients', href: '/patients' },
];

export default function PatientsIndex({ patients }: Props) {
    const calculateAge = (dateOfBirth: string) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patients - SIMRS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👥 Patient Management</h1>
                        <p className="text-gray-600 mt-1">Manage patient records and information</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/patients/create">➕ Register New Patient</Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Patients</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{patients.meta.total}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg">👥</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Active Patients</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    {patients.data.filter(p => p.status === 'active').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg">✅</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">New This Month</p>
                                <p className="text-2xl font-bold text-cyan-600 mt-1">
                                    {patients.data.filter(p => {
                                        const created = new Date(p.created_at);
                                        const now = new Date();
                                        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
                                    }).length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                                <span className="text-cyan-600 text-lg">📈</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Patients Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Patient List</h3>
                    </div>
                    
                    {patients.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Patient Info</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Age/Gender</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Contact</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Recent Appointments</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {patients.data.map((patient) => (
                                        <tr key={patient.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">{patient.name}</div>
                                                    <div className="text-sm text-gray-500">
                                                        MR: {patient.medical_record_number}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm">
                                                    <div className="text-gray-900">{calculateAge(patient.date_of_birth)} years</div>
                                                    <div className="text-gray-500 capitalize">
                                                        {patient.gender === 'male' ? '👨' : '👩'} {patient.gender}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm">
                                                    {patient.phone && (
                                                        <div className="text-gray-900">📞 {patient.phone}</div>
                                                    )}
                                                    {patient.email && (
                                                        <div className="text-gray-500">✉️ {patient.email}</div>
                                                    )}
                                                    {!patient.phone && !patient.email && (
                                                        <div className="text-gray-400">No contact info</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                {patient.appointments.length > 0 ? (
                                                    <div className="text-sm">
                                                        <div className="text-gray-900">
                                                            {patient.appointments[0].type}
                                                        </div>
                                                        <div className="text-gray-500">
                                                            {new Date(patient.appointments[0].appointment_date).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">No appointments</span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                                    patient.status === 'active' 
                                                        ? 'bg-green-100 text-green-800' 
                                                        : 'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {patient.status === 'active' ? '✅' : '⏸️'} {patient.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/patients/${patient.id}`}>View</Link>
                                                    </Button>
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/patients/${patient.id}/edit`}>Edit</Link>
                                                    </Button>
                                                    <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
                                                        <Link href={`/appointments/create?patient_id=${patient.id}`}>
                                                            📅 Book
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">👥</span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients registered yet</h3>
                            <p className="text-gray-600 mb-4">Start by registering your first patient</p>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link href="/patients/create">Register New Patient</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {patients.links && patients.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {patients.links.map((link, index: number) => (
                            <Button
                                key={index}
                                variant={link.active ? "default" : "outline"}
                                size="sm"
                                asChild={!!link.url}
                                disabled={!link.url}
                                className={link.active ? "bg-blue-600 hover:bg-blue-700" : ""}
                            >
                                {link.url ? (
                                    <Link href={link.url} dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                )}
                            </Button>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}