
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { FeeStatus } from '../../types';

export const FeeManagement: React.FC = () => {
    const { fees, students, updateFeeStatus } = useData();
    const [showOnlyPending, setShowOnlyPending] = useState(false);

    const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown';
    
    const filteredFees = showOnlyPending ? fees.filter(f => f.status === FeeStatus.Pending) : fees;

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Fee Management</CardTitle>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="pending-only"
                            checked={showOnlyPending}
                            onChange={() => setShowOnlyPending(!showOnlyPending)}
                            className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                        />
                        <label htmlFor="pending-only" className="ml-2 block text-sm text-gray-900">Show Pending Only</label>
                    </div>
                </CardHeader>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredFees.map(fee => (
                                <tr key={fee.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{getStudentName(fee.studentId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fee.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${fee.amount.toFixed(2)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${fee.status === FeeStatus.Paid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {fee.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {fee.status === FeeStatus.Pending && (
                                            <button onClick={() => updateFeeStatus(fee.id, FeeStatus.Paid)} className="text-primary-600 hover:text-primary-900 font-medium">
                                                Mark as Paid
                                            </button>
                                        )}
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
