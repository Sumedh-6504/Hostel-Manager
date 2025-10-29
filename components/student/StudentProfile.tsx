
import React from 'react';
import { useData } from '../../context/DataContext';
import { Student } from '../../types';
import { Card, CardHeader, CardTitle } from '../common/Card';

const ProfileField: React.FC<{label: string, value: string}> = ({label, value}) => (
    <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="mt-1 text-sm text-gray-900">{value}</p>
    </div>
);

export const StudentProfile: React.FC<{ student: Student }> = ({ student }) => {
    const { rooms, blocks } = useData();

    const room = rooms.find(r => r.id === student.roomId);
    const block = room ? blocks.find(b => b.id === room.blockId) : null;
    const roomDetails = room ? `Room ${room.roomNumber}, ${block?.name || 'Unknown Block'}` : 'Not Assigned';

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                </CardHeader>
                 <div className="space-y-4">
                    <ProfileField label="Name" value={student.name} />
                    <ProfileField label="College ID" value={student.collegeId} />
                    <ProfileField label="Course" value={student.course} />
                    <ProfileField label="Contact" value={student.contact} />
                    <ProfileField label="Room Details" value={roomDetails} />
                 </div>
            </Card>
        </div>
    );
};
