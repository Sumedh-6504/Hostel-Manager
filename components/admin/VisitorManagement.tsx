
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Button } from '../common/Button';

export const VisitorManagement: React.FC = () => {
    const { visitors, students, addVisitor, markVisitorExit } = useData();
    const [showForm, setShowForm] = useState(false);
    const [newVisitor, setNewVisitor] = useState({ visitorName: '', studentId: '' });

    const getStudentName = (studentId: string) => students.find(s => s.id === studentId)?.name || 'Unknown';

    const handleAddVisitor = (e: React.FormEvent) => {
        e.preventDefault();
        if(newVisitor.visitorName && newVisitor.studentId) {
            addVisitor({ ...newVisitor, entryTime: new Date().toISOString() });
            setNewVisitor({ visitorName: '', studentId: '' });
            setShowForm(false);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Visitor Log</CardTitle>
                    <Button onClick={() => setShowForm(!showForm)}>{showForm ? 'Cancel' : 'Log New Visitor'}</Button>
                </CardHeader>
                {showForm && (
                    <form onSubmit={handleAddVisitor} className="p-4 bg-gray-50 rounded-md mb-4 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Visitor Name</label>
                            <input type="text" value={newVisitor.visitorName} onChange={e => setNewVisitor({...newVisitor, visitorName: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Student to Visit</label>
                            <select value={newVisitor.studentId} onChange={e => setNewVisitor({...newVisitor, studentId: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required>
                                <option value="">Select Student</option>
                                {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                            </select>
                        </div>
                        <div className="text-right">
                             <Button type="submit">Log Visitor</Button>
                        </div>
                    </form>
                )}
                 <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Time</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exit Time</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                           {[...visitors].reverse().map(visitor => (
                                <tr key={visitor.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{visitor.visitorName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getStudentName(visitor.studentId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(visitor.entryTime).toLocaleString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {visitor.exitTime ? new Date(visitor.exitTime).toLocaleString() : (
                                            <Button size="sm" variant="secondary" onClick={() => markVisitorExit(visitor.id)}>Mark Exit</Button>
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
