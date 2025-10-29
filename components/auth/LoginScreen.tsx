
import React from 'react';
import { Button } from '../common/Button';
import { BuildingOfficeIcon, UsersIcon } from '@heroicons/react/24/outline';

interface LoginScreenProps {
  onLogin: (role: 'admin' | 'student') => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Hostel Management System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please select your role to login
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <Button
            size="lg"
            onClick={() => onLogin('admin')}
            className="w-full flex justify-center items-center"
          >
            <UsersIcon className="h-5 w-5 mr-2" />
            Login as Admin
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => onLogin('student')}
            className="w-full flex justify-center items-center"
          >
            <BuildingOfficeIcon className="h-5 w-5 mr-2" />
            Login as Student
          </Button>
        </div>
      </div>
    </div>
  );
};
