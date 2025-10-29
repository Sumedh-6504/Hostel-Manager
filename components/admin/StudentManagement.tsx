
import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Button } from '../common/Button';
import { Student } from '../../types';

// Define StudentForm outside to prevent re-declaration on each render
interface StudentFormProps {
    student?: Student | null;
    onSave: (student: Omit<Student, 'id'> | Student) => void;
    onCancel: () => void;
}
const StudentForm: React.FC<StudentFormProps> = ({ student, onSave, onCancel }) => {
    const { rooms } = useData();
    const [formData, setFormData] = useState({
        collegeId: student?.collegeId || '',
        name: student?.name || '',
        course: student?.course || '',
        contact: student?.contact || '',
        roomId: student?.roomId || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...student, ...formData });
    };

    const availableRooms = rooms.filter(r => r.occupancy < r.capacity);

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
             <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">College ID</label>
                <input type="text" value={formData.collegeId} onChange={e => setFormData({...formData, collegeId: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Course</label>
                <input type="text" value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700">Contact</label>
                <input type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm" required />
            </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Room</label>
                <select value={formData.roomId || ''} onChange={e => setFormData({...formData, roomId: e.target.value || null})} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm">
                    <option value="">Unassigned</option>
                    {student?.roomId && <option value={student.roomId}>{rooms.find(r => r.id === student.roomId)?.roomNumber}</option>}
                    {availableRooms.map(room => (
                        <option key={room.id} value={room.id}>{room.roomNumber}</option>
                    ))}
                </select>
            </div>
            <div className="flex justify-end space-x-2">
                <Button type="button" variant="secondary" onClick={onCancel}>Cancel</Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
};

export const StudentManagement: React.FC = () => {
    const { students, rooms, addStudent, updateStudent, deleteStudent } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    
    const handleAdd = () => {
        setEditingStudent(null);
        setIsModalOpen(true);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setIsModalOpen(true);
    };

    const handleDelete = (studentId: string) => {
        if(window.confirm('Are you sure you want to delete this student?')) {
            deleteStudent(studentId);
        }
    };
    
    const handleSave = (studentData: Omit<Student, 'id'> | Student) => {
        if ('id' in studentData && studentData.id) {
            updateStudent(studentData as Student);
        } else {
            addStudent(studentData as Omit<Student, 'id'>);
        }
        setIsModalOpen(false);
    };

    const filteredStudents = useMemo(() => students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.collegeId.toLowerCase().includes(searchTerm.toLowerCase())
    ), [students, searchTerm]);

    const getRoomNumber = (roomId: string | null) => {
        if (!roomId) return 'N/A';
        return rooms.find(r => r.id === roomId)?.roomNumber || 'Unknown';
    };

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <CardTitle>Student Management</CardTitle>
                    <Button onClick={handleAdd}>Add Student</Button>
                </CardHeader>
                <div className="mb-4">
                     <input
                        type="text"
                        placeholder="Search by name or college ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">College ID</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map(student => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.collegeId}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.course}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getRoomNumber(student.roomId)}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                        <Button size="sm" onClick={() => handleEdit(student)}>Edit</Button>
                                        <Button size="sm" variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-lg shadow-lg rounded-md bg-white">
                         <Card>
                            <CardHeader>
                                <CardTitle>{editingStudent ? 'Edit Student' : 'Add Student'}</CardTitle>
                            </CardHeader>
                            <StudentForm student={editingStudent} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
                         </Card>
                    </div>
                </div>
            )}
        </div>
    );
};
