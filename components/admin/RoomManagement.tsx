
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Card, CardHeader, CardTitle } from '../common/Card';
import { Room } from '../../types';

export const RoomManagement: React.FC = () => {
    const { rooms, blocks, students, updateRoom } = useData();

    const getBlockName = (blockId: string) => blocks.find(b => b.id === blockId)?.name || 'Unknown';

    const getStudentsInRoom = (roomId: string) => 
        students.filter(s => s.roomId === roomId).map(s => s.name).join(', ') || 'Empty';

    const toggleMaintenance = (room: Room) => {
        if(room.occupancy > 0 && !room.isUnderMaintenance) {
            alert('Cannot set room to maintenance. It is currently occupied.');
            return;
        }
        updateRoom({ ...room, isUnderMaintenance: !room.isUnderMaintenance });
    };

    return (
        <div className="p-4 sm:p-6">
            <Card>
                <CardHeader>
                    <CardTitle>Room Management</CardTitle>
                </CardHeader>
                <div className="space-y-6">
                    {blocks.map(block => (
                        <div key={block.id}>
                            <h3 className="text-lg font-semibold text-gray-700 mb-2">{block.name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {rooms.filter(r => r.blockId === block.id).map(room => (
                                    <Card key={room.id} className={`border-l-4 ${room.isUnderMaintenance ? 'border-yellow-500' : (room.occupancy === room.capacity ? 'border-red-500' : 'border-green-500')}`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="text-xl font-bold text-gray-800">Room {room.roomNumber}</p>
                                                <p className="text-sm text-gray-500">{getBlockName(room.blockId)}</p>
                                            </div>
                                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${room.isUnderMaintenance ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                                                {room.isUnderMaintenance ? 'Maintenance' : `Occupancy: ${room.occupancy}/${room.capacity}`}
                                            </span>
                                        </div>
                                        <div className="mt-4">
                                            <p className="text-sm font-medium text-gray-600">Students:</p>
                                            <p className="text-sm text-gray-800 truncate">{getStudentsInRoom(room.id)}</p>
                                        </div>
                                        <div className="mt-4 pt-4 border-t">
                                            <button onClick={() => toggleMaintenance(room)} className="text-sm font-medium text-primary-600 hover:text-primary-800">
                                                {room.isUnderMaintenance ? 'Set as Available' : 'Set for Maintenance'}
                                            </button>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};
