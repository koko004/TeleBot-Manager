"use client";

import {useState, useEffect} from 'react';
import {Sidebar, SidebarContent, SidebarHeader, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar";
import {Button} from "@/components/ui/button";

export function SettingsSidebar() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <h3>Settings</h3>
        </SidebarHeader>
        <SidebarContent>
          <Button onClick={toggleTheme}>
            Toggle Theme ({theme === 'light' ? 'Light' : 'Dark'})
          </Button>
        </SidebarContent>
      </Sidebar>
      <SidebarTrigger>Open Settings</SidebarTrigger>
    </SidebarProvider>
  );
}

