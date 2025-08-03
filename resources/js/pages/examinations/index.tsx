import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLayout from '@/components/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Examination {
    id: number;
    examination_type: string;
    examination_date: string;
    status: string;
    height: number | null;
    weight: number | null;
    blood_pressure: string | null;
    heart_rate: number | null;
    temperature: number | null;
    diagnosis: string | null;
    patient: {
        id: number;
        name: string;
        medical_record_number: string;
    };
    appointment: {
        id: number;
        appointment_number: string;
        type: string;
    };
    examiner: {
        name: string;
    };
}

interface Props {
    examinations: {
        data: Examination[];
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
    { title: 'Examinations', href: '/examinations' },
];

export default function ExaminationsIndex({ examinations }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'completed': return '✅';
            case 'pending': return '⏳';
            default: return '⚪';
        }
    };

    const calculateBMI = (height: number | null, weight: number | null) => {
        if (!height || !weight) return null;
        const heightInMeters = height / 100;
        return (weight / (heightInMeters * heightInMeters)).toFixed(1);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Examinations - SIMRS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🩺 Examination Records</h1>
                        <p className="text-gray-600 mt-1">View and manage medical examination results</p>
                    </div>
                    <Button asChild className="bg-blue-600 hover:bg-blue-700">
                        <Link href="/examinations/create">➕ New Examination</Link>
                    </Button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Examinations</p>
                                <p className="text-2xl font-bold text-gray-900 mt-1">{examinations.meta.total}</p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <span className="text-blue-600 text-lg">🩺</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Completed</p>
                                <p className="text-2xl font-bold text-green-600 mt-1">
                                    {examinations.data.filter(e => e.status === 'completed').length}
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
                                <p className="text-gray-600 text-sm font-medium">Pending</p>
                                <p className="text-2xl font-bold text-yellow-600 mt-1">
                                    {examinations.data.filter(e => e.status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                                <span className="text-yellow-600 text-lg">⏳</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Examinations Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">Examination Records</h3>
                    </div>
                    
                    {examinations.data.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Patient</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Examination</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Vital Signs</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Examiner</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                                        <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {examinations.data.map((examination) => (
                                        <tr key={examination.id} className="hover:bg-gray-50">
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {examination.patient.name}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {examination.patient.medical_record_number}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div>
                                                    <div className="font-medium text-gray-900">
                                                        {examination.examination_type}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {examination.appointment.appointment_number}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm">
                                                    <div className="text-gray-900">
                                                        {new Date(examination.examination_date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        {new Date(examination.examination_date).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm space-y-1">
                                                    {examination.height && examination.weight && (
                                                        <div className="text-gray-900">
                                                            📏 {examination.height}cm, ⚖️ {examination.weight}kg
                                                            {calculateBMI(examination.height, examination.weight) && (
                                                                <span className="text-gray-600">
                                                                    {' '}(BMI: {calculateBMI(examination.height, examination.weight)})
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}
                                                    {examination.blood_pressure && (
                                                        <div className="text-gray-600">🩺 {examination.blood_pressure}</div>
                                                    )}
                                                    {examination.heart_rate && (
                                                        <div className="text-gray-600">❤️ {examination.heart_rate} BPM</div>
                                                    )}
                                                    {examination.temperature && (
                                                        <div className="text-gray-600">🌡️ {examination.temperature}°C</div>
                                                    )}
                                                    {!examination.height && !examination.weight && !examination.blood_pressure && !examination.heart_rate && !examination.temperature && (
                                                        <span className="text-gray-400">No vital signs recorded</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm text-gray-900">
                                                    {examination.examiner.name}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getStatusColor(examination.status)}`}>
                                                    {getStatusIcon(examination.status)} {examination.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex space-x-2">
                                                    <Button size="sm" variant="outline" asChild>
                                                        <Link href={`/examinations/${examination.id}`}>View</Link>
                                                    </Button>
                                                    {examination.status === 'pending' && (
                                                        <Button size="sm" variant="outline" asChild>
                                                            <Link href={`/examinations/${examination.id}/edit`}>Edit</Link>
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
                            <span className="text-6xl mb-4 block">🩺</span>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No examinations recorded</h3>
                            <p className="text-gray-600 mb-4">Start by creating your first examination record</p>
                            <Button asChild className="bg-blue-600 hover:bg-blue-700">
                                <Link href="/examinations/create">New Examination</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {examinations.links && examinations.links.length > 3 && (
                    <div className="flex justify-center space-x-2">
                        {examinations.links.map((link, index: number) => (
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