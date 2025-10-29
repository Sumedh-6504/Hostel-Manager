
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Student } from '../../types';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Button } from '../common/Button';

export const ComplaintForm: React.FC<{ student: Student }> = ({ student }) => {
    const { addComplaint } = useData();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        addComplaint({
            studentId: student.id,
            title,
            description,
            date: new Date().toISOString()
        });
        setTitle('');
        setDescription('');
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000); // Reset after 3 seconds
    };

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Raise a Complaint / Request</CardTitle>
                </CardHeader>
                {submitted ? (
                    <div className="text-center p-4 bg-green-100 text-green-800 rounded-md">
                        Your request has been submitted successfully!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Subject</label>
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                id="description"
                                rows={4}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                                required
                            ></textarea>
                        </div>
                        <div className="text-right">
                             <Button type="submit">Submit Request</Button>
                        </div>
                    </form>
                )}
            </Card>
        </div>
    );
};
