import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Appointment {
    id: number;
    appointment_number: string;
    appointment_date: string;
    type: string;
    status: string;
    notes: string | null;
    patient: {
        id: number;
        name: string;
        medical_record_number: string;
    };
}

interface Props {
    appointments: {
        data: Appointment[];
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
    { title: 'Appointments', href: '/appointments' },
];

export default function AppointmentsIndex({ appointments }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'scheduled': return 'bg-blue-100 text-blue-800';
            case 'in_progress': return 'bg-yellow-100 text-yellow-800';
            case 'completed': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'scheduled': return '📅';
            case 'in_progress': return '⏳';
            case 'completed': return '✅';
            case 'cancelled': return '❌';
            default: return '⚪';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointments - SIMRS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📅 Appointment Management</h1>
                        <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/appointments/create">➕ Schedule Appointment</Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Appointments</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{appointments.meta.total}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg">📅</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Scheduled</p>
                                <p className="text-2xl font-bold text-blue-600 mt-1">
                                    {appointments.data.filter(a => a.status === 'scheduled').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg">📅</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">In Progress</p>
                                <p className="text-2xl font-bold text-yellow-600 mt-1">
                                    {appointments.data.filter(a => a.status === 'in_progress').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 text-lg">⏳</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Completed</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    {appointments.data.filter(a => a.status === 'completed').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <span className="text-green-600 text-lg">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Appointments Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Appointment List</h3>
                    </div>
                    
                    {appointments.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Appointment</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Patient</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Date & Time</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Type</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {appointments.data.map((appointment) => (
                                        <tr key={appointment.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {appointment.appointment_number}
                                                    </div>
                                                    {appointment.notes && (
                                                        <div className="text-sm text-gray-500 mt-1">
                                                            {appointment.notes}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {appointment.patient.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {appointment.patient.medical_record_number}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm">
                                                    <div className="text-gray-900">
                                                        {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        {new Date(appointment.appointment_date).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-sm text-gray-900">{appointment.type}</span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(appointment.status)}`}>
                                                    {getStatusIcon(appointment.status)} {appointment.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/appointments/${appointment.id}`}>View</Link>
                                                    </Button>
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/appointments/${appointment.id}/edit`}>Edit</Link>
                                                    </Button>
                                                    {appointment.status === 'scheduled' && (
                                                        <Button size="sm" asChild className="bg-green-600 hover:bg-green-700">
                                                            <Link href={`/examinations/create?appointment_id=${appointment.id}`}>
                                                                🩺 Examine
                                                            </Link>
                                                        </Button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">📅</span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments scheduled</h3>
                            <p className="text-gray-600 mb-4">Start by scheduling your first appointment</p>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link href="/appointments/create">Schedule Appointment</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {appointments.links && appointments.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {appointments.links.map((link, index: number) => (
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