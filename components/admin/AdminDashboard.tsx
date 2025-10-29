
import React, { useState } from 'react';
import { DashboardOverview } from './DashboardOverview';
import { StudentManagement } from './StudentManagement';
import { RoomManagement } from './RoomManagement';
import { FeeManagement } from './FeeManagement';
import { VisitorManagement } from './VisitorManagement';
import { ComplaintsView } from './ComplaintsView';
import { HomeIcon } from '../icons/HomeIcon';
import { BuildingOfficeIcon } from '../icons/BuildingOfficeIcon';
import { UsersIcon } from '../icons/UsersIcon';
import { CurrencyDollarIcon } from '../icons/CurrencyDollarIcon';
import { IdentificationIcon } from '../icons/IdentificationIcon';
import { ClipboardDocumentListIcon } from '../icons/ClipboardDocumentListIcon';

type AdminView = 'dashboard' | 'students' | 'rooms' | 'fees' | 'visitors' | 'complaints';

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

export const AdminDashboard: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    const [activeView, setActiveView] = useState<AdminView>('dashboard');

    const renderView = () => {
        switch (activeView) {
            case 'dashboard': return <DashboardOverview />;
            case 'students': return <StudentManagement />;
            case 'rooms': return <RoomManagement />;
            case 'fees': return <FeeManagement />;
            case 'visitors': return <VisitorManagement />;
            case 'complaints': return <ComplaintsView />;
            default: return <DashboardOverview />;
        }
    };
    
    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
                <div className="h-16 flex items-center justify-center border-b">
                    <h1 className="text-xl font-bold text-primary-600">Admin Panel</h1>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <NavItem icon={HomeIcon} label="Dashboard" isActive={activeView === 'dashboard'} onClick={() => setActiveView('dashboard')} />
                    <NavItem icon={UsersIcon} label="Students" isActive={activeView === 'students'} onClick={() => setActiveView('students')} />
                    <NavItem icon={BuildingOfficeIcon} label="Rooms" isActive={activeView === 'rooms'} onClick={() => setActiveView('rooms')} />
                    <NavItem icon={CurrencyDollarIcon} label="Fees" isActive={activeView === 'fees'} onClick={() => setActiveView('fees')} />
                    <NavItem icon={IdentificationIcon} label="Visitors" isActive={activeView === 'visitors'} onClick={() => setActiveView('visitors')} />
                    <NavItem icon={ClipboardDocumentListIcon} label="Complaints" isActive={activeView === 'complaints'} onClick={() => setActiveView('complaints')} />
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
