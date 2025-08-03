import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🏥</span>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">SIMRS Medical Check-up</h1>
                                <p className="text-sm text-blue-600">Healthcare Management System</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Button variant="outline" asChild>
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                                <Link href="/register">Get Started</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-8">
                        <span className="text-3xl">🩺</span>
                    </div>
                    <h1 className="text-5xl font-bold text-gray-900 mb-6">
                        Modern Healthcare Management
                        <span className="block text-blue-600 mt-2">Made Simple</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        Streamline your medical check-up processes with our comprehensive SIMRS solution. 
                        Manage patients, schedule appointments, and track examination results all in one place.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                            <Link href="/register">Start Free Trial</Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="/login">Sign In</Link>
                        </Button>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Patient Registration</h3>
                        <p className="text-gray-600">
                            Easily register and manage patient information with comprehensive medical records
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">📅</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Appointment Scheduling</h3>
                        <p className="text-gray-600">
                            Schedule and manage appointments with intuitive calendar integration
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">📋</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Examination Results</h3>
                        <p className="text-gray-600">
                            Record and track examination results with detailed medical assessments
                        </p>
                    </div>

                    <div className="bg-white rounded-2xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center mb-4">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Medical History</h3>
                        <p className="text-gray-600">
                            Access complete patient medical history and treatment records
                        </p>
                    </div>
                </div>

                {/* Dashboard Preview */}
                <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden mb-16">
                    <div className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-6">
                        <h3 className="text-2xl font-bold text-white mb-2">Dashboard Overview</h3>
                        <p className="text-blue-100">Get real-time insights into your medical practice</p>
                    </div>
                    <div className="p-8">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl">👨‍⚕️</span>
                                    <span className="text-3xl font-bold text-blue-600">847</span>
                                </div>
                                <h4 className="font-semibold text-gray-900">Total Patients</h4>
                                <p className="text-sm text-gray-600">Registered in system</p>
                            </div>
                            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl">📅</span>
                                    <span className="text-3xl font-bold text-cyan-600">23</span>
                                </div>
                                <h4 className="font-semibold text-gray-900">Today's Appointments</h4>
                                <p className="text-sm text-gray-600">Scheduled for today</p>
                            </div>
                            <div className="bg-gradient-to-br from-sky-50 to-sky-100 rounded-xl p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-2xl">✅</span>
                                    <span className="text-3xl font-bold text-sky-600">156</span>
                                </div>
                                <h4 className="font-semibold text-gray-900">Completed Check-ups</h4>
                                <p className="text-sm text-gray-600">This month</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Benefits */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-12">Why Choose Our SIMRS Solution?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Fast & Efficient</h3>
                            <p className="text-gray-600">
                                Reduce administrative time by 60% with automated workflows and intelligent scheduling
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl">🔒</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Secure & Compliant</h3>
                            <p className="text-gray-600">
                                HIPAA compliant with enterprise-grade security to protect patient data
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-sky-600 rounded-full flex items-center justify-center mx-auto">
                                <span className="text-2xl">📱</span>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">Mobile Ready</h3>
                            <p className="text-gray-600">
                                Access patient information and manage appointments from any device, anywhere
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Practice?</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join thousands of healthcare providers who trust our SIMRS solution for their medical check-up management
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/register" className="bg-white text-blue-600 hover:bg-gray-100">
                                Start Your Free Trial
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                            <Link href="/login">
                                Sign In Now
                            </Link>
                        </Button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t border-blue-100 mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <div className="flex items-center justify-center space-x-3 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">🏥</span>
                            </div>
                            <span className="text-lg font-semibold text-gray-900">SIMRS Medical Check-up</span>
                        </div>
                        <p className="text-gray-600">
                            © 2024 SIMRS Medical Check-up System. Empowering healthcare professionals worldwide.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}