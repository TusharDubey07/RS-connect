import React from 'react';
import { Sidebar } from './Sidebar';

export function Layout({ children, setIsAuthenticated }) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <Sidebar setIsAuthenticated={setIsAuthenticated} />
        <main className="flex-1 pl-[150px]">
          {children}
        </main>
      </div>
    );
  }