import React from 'react';
import { Sidebar } from '../component/Sidebar';

export default function Staff() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 pl-[150px]">
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-semibold mb-6">Staff Management</h1>
          {/* Add your staff management content here */}
        </div>
      </main>
    </div>
  );
}