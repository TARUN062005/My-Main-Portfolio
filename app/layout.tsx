"use client";

import { useState, useEffect } from 'react';
import ServerLayout from './server-layout';
import './globals.css';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ServerLayout>
      <header className="flex justify-end items-center p-4 bg-header-footer-bg text-header-footer-text">
        <button onClick={toggleTheme} className="mr-4 flex items-center">
          <i className={`fas fa-${theme === 'light' ? 'sun' : 'moon'} mr-2`}></i>
          <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        <a href="/admin" className="flex items-center">
          <i className="fas fa-user-shield mr-2"></i>
          <span>Admin</span>
        </a>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="flex justify-between items-center p-4 bg-header-footer-bg text-header-footer-text">
        <div className="flex-grow text-center">
          &copy; {new Date().getFullYear()} Your Company Name
        </div>
        <div>
          <a href="/privacy">Privacy</a>
        </div>
      </footer>
    </ServerLayout>
  );
}