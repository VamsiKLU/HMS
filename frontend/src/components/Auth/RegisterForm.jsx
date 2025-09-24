import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useAuth } from '../../contexts/AuthContext';
import { Activity, User, Stethoscope, Mail, Lock, UserCheck, Phone, MapPin, Calendar, Eye, EyeOff } from 'lucide-react';

export function RegisterForm({ onNavigateToLogin }) {
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    specialization: '', // For doctors
    licenseNumber: '', // For doctors
    emergencyContact: '', // For patients
    bloodGroup: '', // For patients
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Role-specific validation
    if (formData.role === 'doctor' && (!formData.specialization || !formData.licenseNumber)) {
      setError('Please fill in specialization and license number for doctors');
      return;
    }

    if (formData.role === 'patient' && (!formData.emergencyContact || !formData.bloodGroup)) {
      setError('Please fill in emergency contact and blood group for patients');
      return;
    }

    const result = await register(formData);
    if (result.success) {
      setSuccess('Registration successful! You can now login.');
      // Clear form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        specialization: '',
        licenseNumber: '',
        emergencyContact: '',
        bloodGroup: '',
      });
      // Redirect to login after successful registration
      setTimeout(() => {
        onNavigateToLogin();
      }, 2000);
    } else {
      setError(result.error || 'Registration failed. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="flex items-center">
              <Activity size={32} className="text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900 dark:text-white">MedVault</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Join our medical community
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
            {/* Role Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                I am a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'patient'})}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === 'patient'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-600'
                  }`}
                >
                  <User className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Patient</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, role: 'doctor'})}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.role === 'doctor'
                      ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-green-300 dark:hover:border-green-600'
                  }`}
                >
                  <Stethoscope className="h-8 w-8 mx-auto mb-2" />
                  <span className="font-medium">Doctor</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  Basic Information
                </h3>
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      autoComplete="bday"
                      className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Role-specific Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                  {formData.role === 'doctor' ? 'Medical Information' : 'Health Information'}
                </h3>

                {formData.role === 'doctor' ? (
                  <>
                    <div>
                      <label htmlFor="specialization" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Specialization *
                      </label>
                      <select
                        id="specialization"
                        name="specialization"
                        autoComplete="off"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        value={formData.specialization}
                        onChange={handleChange}
                      >
                        <option value="">Select specialization</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="neurology">Neurology</option>
                        <option value="orthopedics">Orthopedics</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="psychiatry">Psychiatry</option>
                        <option value="surgery">Surgery</option>
                        <option value="internal_medicine">Internal Medicine</option>
                        <option value="emergency_medicine">Emergency Medicine</option>
                        <option value="radiology">Radiology</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Medical License Number *
                      </label>
                      <input
                        id="licenseNumber"
                        name="licenseNumber"
                        type="text"
                      autoComplete="off"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Enter license number"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="bloodGroup" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Blood Group *
                      </label>
                      <select
                        id="bloodGroup"
                        name="bloodGroup"
                        autoComplete="off"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        value={formData.bloodGroup}
                        onChange={handleChange}
                      >
                        <option value="">Select blood group</option>
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Emergency Contact *
                      </label>
                      <input
                        id="emergencyContact"
                        name="emergencyContact"
                        type="tel"
                      autoComplete="tel"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Emergency contact number"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="mt-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  autoComplete="street-address"
                  className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Section */}
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white border-b pb-2">
                Security
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      required
                      className="pl-10 pr-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 focus:outline-none focus:text-gray-600 dark:focus:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-400 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mt-4 bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-400 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {isLoading ? 'Creating account...' : 'Create Account'}
              </button>
            </div>

           <div className="mt-6 text-center">
             <p className="text-sm text-gray-600 dark:text-gray-400">
               Already have an account?{' '}
               <button
                 type="button"
                 onClick={onNavigateToLogin}
                 className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
               >
                 Sign in here
               </button>
             </p>
           </div>
         </div>
       </form>
     </div>
   </div>
 );
}

RegisterForm.propTypes = {
  onNavigateToLogin: PropTypes.func.isRequired
};