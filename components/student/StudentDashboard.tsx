
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { StudentProfile } from './StudentProfile';
import { StudentFeeStatus } from './StudentFeeStatus';
import { ComplaintForm } from './ComplaintForm';
import { UsersIcon } from '../icons/UsersIcon';
import { CurrencyDollarIcon } from '../icons/CurrencyDollarIcon';
import { ClipboardDocumentListIcon } from '../icons/ClipboardDocumentListIcon';

type StudentView = 'profile' | 'fees' | 'complaint';

const NavItem: React.FC<{ icon: React.ElementType, label: string, isActive: boolean, onClick: () => void }> = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${
            isActive ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'
        }`}
    >
        <Icon className="h-5 w-5 mr-3" />
        <span>{label}</span>
    </button>
);

export const StudentDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const { students } = useData();
    const [activeView, setActiveView] = useState<StudentView>('profile');

    // For simplicity, we'll hardcode the logged-in student as the first one.
    const loggedInStudent = students[0];
    if (!loggedInStudent) return <div className="p-8">No student data available.</div>;

    const renderView = () => {
        switch (activeView) {
            case 'profile': return <StudentProfile student={loggedInStudent} />;
            case 'fees': return <StudentFeeStatus student={loggedInStudent} />;
            case 'complaint': return <ComplaintForm student={loggedInStudent} />;
            default: return <StudentProfile student={loggedInStudent} />;
        }
    };
    
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-xl font-bold text-primary-600">Student Portal</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon={UsersIcon} label="My Profile" isActive={activeView === 'profile'} onClick={() => setActiveView('profile')} />
                    <NavItem icon={CurrencyDollarIcon} label="Fee Status" isActive={activeView === 'fees'} onClick={() => setActiveView('fees')} />
                    <NavItem icon={ClipboardDocumentListIcon} label="New Request" isActive={activeView === 'complaint'} onClick={() => setActiveView('complaint')} />
                </nav>
                 <div className="p-4 border-t">
                    <button
                        onClick={onLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm font-medium rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </aside>
            <main className="flex-1 overflow-y-auto">
                {renderView()}
            </main>
        </div>
    );
};
