import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Props {
    stats: {
        total_patients: number;
        active_patients: number;
        upcoming_appointments: number;
        today_appointments: number;
        completed_examinations: number;
        pending_examinations: number;
    };
    upcomingAppointments: Array<{
        id: number;
        appointment_number: string;
        appointment_date: string;
        type: string;
        status: string;
        patient: {
            id: number;
            name: string;
            medical_record_number: string;
        };
    }>;
    recentExaminations: Array<{
        id: number;
        examination_type: string;
        examination_date: string;
        status: string;
        patient: {
            id: number;
            name: string;
        };
        examiner: {
            name: string;
        };
    }>;
    todayAppointments: Array<{
        id: number;
        appointment_number: string;
        appointment_date: string;
        type: string;
        status: string;
        patient: {
            id: number;
            name: string;
            medical_record_number: string;
        };
    }>;
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats, upcomingAppointments, recentExaminations, todayAppointments }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="SIMRS Dashboard" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🏥 Medical Check-up Dashboard</h1>
                        <p className="text-gray-600 mt-1">Overview of your healthcare management system</p>
                    </div>
                    <div className="flex space-x-3">
                        <Button asChild className="bg-blue-600 hover:bg-blue-700">
                            <Link href="/patients/create">➕ Add Patient</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/appointments/create">📅 Schedule Appointment</Link>
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-blue-600 text-sm font-medium">Total Patients</p>
                                <p className="text-3xl font-bold text-blue-900 mt-1">{stats.total_patients}</p>
                                <p className="text-blue-700 text-sm mt-1">👥 {stats.active_patients} active</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl">👨‍⚕️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6 border border-cyan-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-cyan-600 text-sm font-medium">Today's Appointments</p>
                                <p className="text-3xl font-bold text-cyan-900 mt-1">{stats.today_appointments}</p>
                                <p className="text-cyan-700 text-sm mt-1">📅 {stats.upcoming_appointments} upcoming</p>
                            </div>
                            <div className="w-12 h-12 bg-cyan-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl">📅</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-6 border border-teal-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-teal-600 text-sm font-medium">Examinations</p>
                                <p className="text-3xl font-bold text-teal-900 mt-1">{stats.completed_examinations}</p>
                                <p className="text-teal-700 text-sm mt-1">✅ {stats.pending_examinations} pending</p>
                            </div>
                            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
                                <span className="text-white text-xl">🩺</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Today's Appointments */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">📅 Today's Appointments</h3>
                            <Link href="/appointments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View all →
                            </Link>
                        </div>
                        
                        {todayAppointments.length > 0 ? (
                            <div className="space-y-3">
                                {todayAppointments.slice(0, 5).map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-900">{appointment.patient.name}</span>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {appointment.patient.medical_record_number}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{appointment.type}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(appointment.appointment_date).toLocaleTimeString('en-US', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/appointments/${appointment.id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-4xl mb-2 block">📅</span>
                                <p className="text-gray-500">No appointments scheduled for today</p>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Appointments */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">⏰ Upcoming Appointments</h3>
                            <Link href="/appointments" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View all →
                            </Link>
                        </div>
                        
                        {upcomingAppointments.length > 0 ? (
                            <div className="space-y-3">
                                {upcomingAppointments.slice(0, 5).map((appointment) => (
                                    <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-2">
                                                <span className="font-medium text-gray-900">{appointment.patient.name}</span>
                                                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                    {appointment.patient.medical_record_number}
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-600">{appointment.type}</p>
                                            <p className="text-xs text-gray-500">
                                                {new Date(appointment.appointment_date).toLocaleDateString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link href={`/appointments/${appointment.id}`}>View</Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-4xl mb-2 block">⏰</span>
                                <p className="text-gray-500">No upcoming appointments</p>
                            </div>
                        )}
                    </div>

                    {/* Recent Examinations */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 lg:col-span-2">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">🩺 Recent Examinations</h3>
                            <Link href="/examinations" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View all →
                            </Link>
                        </div>
                        
                        {recentExaminations.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-gray-200">
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Patient</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Examination Type</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Examiner</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                                            <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentExaminations.slice(0, 8).map((examination) => (
                                            <tr key={examination.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="py-3 px-4">
                                                    <div className="font-medium text-gray-900">{examination.patient.name}</div>
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{examination.examination_type}</td>
                                                <td className="py-3 px-4 text-gray-600">
                                                    {new Date(examination.examination_date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                                <td className="py-3 px-4 text-gray-600">{examination.examiner.name}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                                        examination.status === 'completed' 
                                                            ? 'bg-green-100 text-green-800' 
                                                            : 'bg-yellow-100 text-yellow-800'
                                                    }`}>
                                                        {examination.status === 'completed' ? '✅' : '⏳'} {examination.status}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/examinations/${examination.id}`}>View</Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <span className="text-4xl mb-2 block">🩺</span>
                                <p className="text-gray-500">No examinations recorded yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-semibold mb-4">🚀 Quick Actions</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Button asChild variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                            <Link href="/patients">📋 Manage Patients</Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                            <Link href="/appointments">📅 View Appointments</Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                            <Link href="/examinations">🩺 Examination Records</Link>
                        </Button>
                        <Button asChild variant="secondary" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                            <Link href="/examinations/create">➕ New Examination</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}