import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar,
  Users,
  FileText,
  Clock,
  Plus,
  Eye,
  Edit,
  Upload,
  Activity
} from 'lucide-react';
import { mockAppointments, mockMedicalRecords } from '../../data/mockData.js';
import { PatientRecordModal } from '../Modals/PatientRecordModal.jsx';
import { AddNotesModal } from '../Modals/AddNotesModal.jsx';

export function DoctorDashboard() {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const todayAppointments = mockAppointments.filter(apt => apt.date === '2025-01-20');
  const recentRecords = mockMedicalRecords.slice(0, 5);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => navigate('/doctor/appointments')}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
          <Calendar className="h-8 w-8 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
          <h3 className="font-semibold text-lg mb-2">My Appointments</h3>
          <p className="text-sm text-blue-100">View and manage appointments</p>
        </button>

        <button
          onClick={() => navigate('/doctor/patients')}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
           <Users className="h-8 w-8 text-green-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
           <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">My Patients</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Patient management</p>
         </button>

        <button
          onClick={() => navigate('/doctor/medical-records')}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
           <FileText className="h-8 w-8 text-purple-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
           <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Medical Records</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Patient documentation</p>
         </button>

        <button
          onClick={() => navigate('/doctor/reports')}
          className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg p-6 text-left transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg shadow-sm"
        >
           <Activity className="h-8 w-8 text-orange-600 mb-4 transition-transform duration-300 ease-in-out group-hover:scale-110" />
           <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Reports</h3>
           <p className="text-sm text-gray-500 dark:text-gray-400">Analytics and insights</p>
         </button>
       </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Appointments</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">{todayAppointments.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Patients</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">247</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <FileText className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Records Created</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">15</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Consultation</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">28m</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Today's Appointments</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium">
                        {appointment.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{appointment.patientName}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{appointment.time} - {appointment.reason}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setSelectedPatient(appointment.patientId)}
                        className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/20 rounded transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedAppointment(appointment.id);
                          setShowNotesModal(true);
                        }}
                        className="p-1 text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 rounded transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Plus size={16} className="mr-2" />
              Add New Appointment
            </button>
          </div>
        </div>

        {/* Recent Patient Records */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Patient Records</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentRecords.map((record) => (
                <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white">{record.patientName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{record.title}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{record.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      record.type === 'consultation' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                      record.type === 'test' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                      'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                    }`}>
                      {record.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <Upload size={16} className="mr-2" />
              Upload New Record
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {selectedPatient && (
        <PatientRecordModal
          patientId={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}

      {showNotesModal && selectedAppointment && (
        <AddNotesModal
          appointmentId={selectedAppointment}
          onClose={() => {
            setShowNotesModal(false);
            setSelectedAppointment(null);
          }}
        />
      )}
    </div>
  );
}