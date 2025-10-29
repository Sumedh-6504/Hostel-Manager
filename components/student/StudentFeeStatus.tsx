
import React from 'react';
import { useData } from '../../context/DataContext';
import { Student, FeeStatus } from '../../types';
import { Card, CardHeader, CardTitle } from '../common/Card';

export const StudentFeeStatus: React.FC<{ student: Student }> = ({ student }) => {
    const { fees } = useData();
    const studentFees = fees.filter(f => f.studentId === student.id);

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Fee Status</CardTitle>
                </CardHeader>
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                           {studentFees.map(fee => (
                                <tr key={fee.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(fee.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fee.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                         <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${fee.status === FeeStatus.Paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
