import React from "react";
import { SidebarNav } from "./Sidebar-nav"; 

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const sidebarWidth = "w-72"; 

  return (
    <div className="flex h-screen bg-background">
      <aside
        className={`fixed left-0 top-0 h-full ${sidebarWidth} border-r border-border bg-muted/40 hidden md:flex md:flex-col`}
      >
        <SidebarNav />
      </aside>

      <main
        className={`flex-1 overflow-y-auto md:ml-72`} 
      >
        <div className="p-4 md:p-8 lg:p-10">{children}</div>
      </main>

    </div>
  );
}
