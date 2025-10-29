
import React from 'react';
import { useData } from '../../context/DataContext';
import { Card } from '../common/Card';
import { UsersIcon, BuildingOfficeIcon, CurrencyDollarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { FeeStatus } from '../../types';

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number, color: string }> = ({ icon: Icon, title, value, color }) => (
    <Card className="flex items-center p-4">
        <div className={`p-3 rounded-full mr-4 ${color}`}>
            <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </Card>
);

export const DashboardOverview: React.FC = () => {
  const { students, rooms, fees, complaints } = useData();

  const totalStudents = students.length;
  const availableRooms = rooms.filter(r => !r.isUnderMaintenance && r.occupancy < r.capacity).length;
  const totalRooms = rooms.length;
  const outstandingFees = fees.filter(f => f.status === FeeStatus.Pending).length;
  const pendingComplaints = complaints.filter(c => !c.isResolved).length;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={UsersIcon} title="Total Students" value={totalStudents} color="bg-blue-500" />
        <StatCard icon={BuildingOfficeIcon} title="Available Rooms" value={`${availableRooms} / ${totalRooms}`} color="bg-green-500" />
        <StatCard icon={CurrencyDollarIcon} title="Outstanding Fees" value={outstandingFees} color="bg-yellow-500" />
        <StatCard icon={ClipboardDocumentListIcon} title="Pending Complaints" value={pendingComplaints} color="bg-red-500" />
      </div>
    </div>
  );
};
