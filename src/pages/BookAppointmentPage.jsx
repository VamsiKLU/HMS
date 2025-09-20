import React, { useState } from 'react';
import { Calendar, Clock, User, Video, MessageSquare, Star, ChevronLeft } from 'lucide-react';
import { mockDoctors } from '../data/mockData.js';
import { BookAppointmentModal } from '../components/Modals/BookAppointmentModal.jsx';

export function BookAppointmentPage({ onNavigateBack }) {
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onNavigateBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Book Appointment</h1>
          <p className="text-gray-600 dark:text-gray-400">Schedule a consultation with our healthcare professionals</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Find the Right Doctor for You</h2>
          <p className="text-xl opacity-90 mb-6">
            Connect with experienced healthcare professionals through in-person visits, video consultations, or phone calls.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <Video className="w-5 h-5 mr-2" />
              <span>Video Consultations</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <MessageSquare className="w-5 h-5 mr-2" />
              <span>Phone Consultations</span>
            </div>
            <div className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
              <User className="w-5 h-5 mr-2" />
              <span>In-Person Visits</span>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Choose Your Doctor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={doctor.avatar}
                    alt={doctor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{doctor.name}</h4>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{doctor.specialization}</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{doctor.rating}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{doctor.bio}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <span>{doctor.experience} experience</span>
                  <span>{doctor.department}</span>
                </div>

                <button
                  onClick={() => handleDoctorSelect(doctor)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Calendar size={16} />
                  <span>Book Appointment</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookAppointmentModal onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  );
}