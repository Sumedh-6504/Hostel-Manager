
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Block, Room, Student, Fee, Visitor, Complaint, FeeStatus } from '../types';

// Mock Data
const initialBlocks: Block[] = [
  { id: 'B01', name: 'Block A' },
  { id: 'B02', name: 'Block B' },
];

const initialRooms: Room[] = [
  { id: 'R101', roomNumber: '101', blockId: 'B01', capacity: 2, occupancy: 2, isUnderMaintenance: false },
  { id: 'R102', roomNumber: '102', blockId: 'B01', capacity: 2, occupancy: 1, isUnderMaintenance: false },
  { id: 'R201', roomNumber: '201', blockId: 'B02', capacity: 3, occupancy: 3, isUnderMaintenance: true },
  { id: 'R202', roomNumber: '202', blockId: 'B02', capacity: 3, occupancy: 0, isUnderMaintenance: false },
];

const initialStudents: Student[] = [
  { id: 'S001', collegeId: 'CST123', name: 'John Doe', course: 'Computer Science', contact: '123-456-7890', roomId: 'R101' },
  { id: 'S002', collegeId: 'MEC456', name: 'Jane Smith', course: 'Mechanical Eng.', contact: '234-567-8901', roomId: 'R101' },
  { id: 'S003', collegeId: 'ECE789', name: 'Peter Jones', course: 'Electronics', contact: '345-678-9012', roomId: 'R102' },
  { id: 'S004', collegeId: 'CST321', name: 'Mary Johnson', course: 'Computer Science', contact: '456-789-0123', roomId: 'R201' },
];

const initialFees: Fee[] = [
    { id: 'F01', studentId: 'S001', type: 'Tuition', amount: 1200, status: FeeStatus.Paid, date: new Date().toISOString() },
    { id: 'F02', studentId: 'S002', type: 'Mess', amount: 300, status: FeeStatus.Paid, date: new Date().toISOString() },
    { id: 'F03', studentId: 'S003', type: 'Maintenance', amount: 50, status: FeeStatus.Pending, date: new Date().toISOString() },
    { id: 'F04', studentId: 'S001', type: 'Mess', amount: 300, status: FeeStatus.Pending, date: new Date().toISOString() },
];

const initialVisitors: Visitor[] = [
    { id: 'V01', visitorName: 'Alice Doe', studentId: 'S001', entryTime: new Date().toISOString(), exitTime: null }
];

const initialComplaints: Complaint[] = [
    { id: 'C01', studentId: 'S003', title: 'Leaky Faucet', description: 'The faucet in room 102 bathroom is leaking.', date: new Date().toISOString(), isResolved: false }
];


interface DataContextType {
  blocks: Block[];
  rooms: Room[];
  students: Student[];
  fees: Fee[];
  visitors: Visitor[];
  complaints: Complaint[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  updateStudent: (student: Student) => void;
  deleteStudent: (studentId: string) => void;
  transferStudent: (studentId: string, newRoomId: string) => void;
  addRoom: (room: Omit<Room, 'id' | 'occupancy'>) => void;
  updateRoom: (room: Room) => void;
  addVisitor: (visitor: Omit<Visitor, 'id' | 'exitTime'>) => void;
  markVisitorExit: (visitorId: string) => void;
  updateFeeStatus: (feeId: string, status: FeeStatus) => void;
  addComplaint: (complaint: Omit<Complaint, 'id' | 'isResolved'>) => void;
  resolveComplaint: (complaintId: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [fees, setFees] = useState<Fee[]>(initialFees);
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors);
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);

  const addStudent = (student: Omit<Student, 'id'>) => {
    const newStudent = { ...student, id: `S${Date.now()}` };
    setStudents(prev => [...prev, newStudent]);
    if (newStudent.roomId) {
        setRooms(prevRooms => prevRooms.map(r => r.id === newStudent.roomId ? { ...r, occupancy: r.occupancy + 1 } : r));
    }
  };

  const updateStudent = (updatedStudent: Student) => {
    setStudents(prev => prev.map(s => s.id === updatedStudent.id ? updatedStudent : s));
  };
  
  const deleteStudent = (studentId: string) => {
    const student = students.find(s => s.id === studentId);
    if(student && student.roomId) {
        setRooms(prevRooms => prevRooms.map(r => r.id === student.roomId ? {...r, occupancy: Math.max(0, r.occupancy - 1)} : r));
    }
    setStudents(prev => prev.filter(s => s.id !== studentId));
  };

  const transferStudent = (studentId: string, newRoomId: string) => {
    const student = students.find(s => s.id === studentId);
    if (!student) return;
    const oldRoomId = student.roomId;

    setStudents(prev => prev.map(s => s.id === studentId ? { ...s, roomId: newRoomId } : s));
    setRooms(prevRooms => prevRooms.map(r => {
        if(r.id === oldRoomId) return {...r, occupancy: Math.max(0, r.occupancy - 1)};
        if(r.id === newRoomId) return {...r, occupancy: r.occupancy + 1};
        return r;
    }));
  };

  const addRoom = (room: Omit<Room, 'id' | 'occupancy'>) => {
      setRooms(prev => [...prev, {...room, id: `R${Date.now()}`, occupancy: 0}]);
  };

  const updateRoom = (updatedRoom: Room) => {
      setRooms(prev => prev.map(r => r.id === updatedRoom.id ? updatedRoom : r));
  };

  const addVisitor = (visitor: Omit<Visitor, 'id' | 'exitTime'>) => {
    setVisitors(prev => [...prev, {...visitor, id: `V${Date.now()}`, exitTime: null}]);
  };

  const markVisitorExit = (visitorId: string) => {
    setVisitors(prev => prev.map(v => v.id === visitorId ? {...v, exitTime: new Date().toISOString()} : v));
  };
  
  const updateFeeStatus = (feeId: string, status: FeeStatus) => {
      setFees(prev => prev.map(f => f.id === feeId ? {...f, status} : f));
  };

  const addComplaint = (complaint: Omit<Complaint, 'id' | 'isResolved'>) => {
    setComplaints(prev => [...prev, {...complaint, id: `C${Date.now()}`, isResolved: false}])
  };

  const resolveComplaint = (complaintId: string) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? {...c, isResolved: true} : c));
  };

  return (
    <DataContext.Provider value={{
      blocks, rooms, students, fees, visitors, complaints,
      addStudent, updateStudent, deleteStudent, transferStudent,
      addRoom, updateRoom,
      addVisitor, markVisitorExit,
      updateFeeStatus,
      addComplaint, resolveComplaint
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
