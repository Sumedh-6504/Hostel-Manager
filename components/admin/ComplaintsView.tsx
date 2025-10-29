
import React from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Button } from '../common/Button';

export const ComplaintsView: React.FC = () => {
    const { complaints, students, rooms, resolveComplaint } = useData();

    const getStudentDetails = (studentId: string) => {
        const student = students.find(s => s.id === studentId);
        if (!student) return { name: 'Unknown', room: 'N/A' };
        const room = rooms.find(r => r.id === student.roomId);
        return { name: student.name, room: room ? `Room ${room.roomNumber}` : 'N/A' };
    };

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Student Complaints & Requests</CardTitle>
                </CardHeader>
                <div className="space-y-4">
                    {[...complaints].reverse().map(complaint => (
                        <div key={complaint.id} className="p-4 border rounded-md bg-gray-50">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-semibold text-gray-800">{complaint.title}</p>
                                    <p className="text-sm text-gray-500">
                                        From: {getStudentDetails(complaint.studentId).name} ({getStudentDetails(complaint.studentId).room})
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        On: {new Date(complaint.date).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${complaint.isResolved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {complaint.isResolved ? 'Resolved' : 'Pending'}
                                </span>
                            </div>
                            <p className="mt-2 text-gray-700">{complaint.description}</p>
                            {!complaint.isResolved && (
                                <div className="text-right mt-2">
                                    <Button size="sm" onClick={() => resolveComplaint(complaint.id)}>Mark as Resolved</Button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
