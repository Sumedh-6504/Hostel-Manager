
export interface Block {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  blockId: string;
  capacity: number;
  occupancy: number;
  isUnderMaintenance: boolean;
}

export interface Student {
  id: string;
  collegeId: string;
  name: string;
  course: string;
  contact: string;
  roomId: string | null;
}

export enum FeeStatus {
  Paid = 'Paid',
  Pending = 'Pending'
}

export interface Fee {
  id:string;
  studentId: string;
  type: 'Tuition' | 'Maintenance' | 'Mess';
  amount: number;
  status: FeeStatus;
  date: string; // ISO string
}

export interface Visitor {
  id: string;
  visitorName: string;
  studentId: string;
  entryTime: string; // ISO string
  exitTime: string | null; // ISO string
}

export interface Complaint {
  id: string;
  studentId: string;
  title: string;
  description: string;
  date: string; // ISO string
  isResolved: boolean;
}
