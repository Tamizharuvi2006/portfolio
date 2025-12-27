import React, { useState, useEffect } from 'react';

const Taskbar = ({ onStartClick }) => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Format: Fri 12 Dec, 09:52 AM
    const formattedTime = time.toLocaleString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).replace(',', '');

    return (
        <div className="h-8 bg-[#1A1A1A] border-b border-[#333] flex items-center justify-between px-2 select-none shadow-md z-50">

            {/* Left: Start/Menu */}
            <div className="flex items-center space-x-2">
                <button
                    onClick={onStartClick}
                    className="flex items-center justify-center p-1 hover:bg-[#333] rounded cursor-pointer transition-colors group"
                    title="Applications"
                >
                    {/* Simple Dragon Logo Placeholder using SVG */}
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white group-hover:fill-accent-green transition-colors">
                        <path d="M12,2C13.1,2 14,2.9 14,4C14,5.1 13.1,6 12,6C10.9,6 10,5.1 10,4C10,2.9 10.9,2 12,2M19,20V22H5V20H19M12,20C13.3,20 14.5,19.3 15.2,18.2C15.9,17.2 16,15.8 15.5,14.7L14,11.5L16,10.5L15,8.5L12,10L9,8.5L8,10.5L10,11.5L8.5,14.7C8,15.8 8.1,17.2 8.8,18.2C9.5,19.3 10.7,20 12,20M12,18C11.5,18 11.1,17.7 10.8,17.3C10.5,16.8 10.5,16.3 10.6,15.8L12,13L13.4,15.8C13.5,16.3 13.5,16.8 13.2,17.3C12.9,17.7 12.5,18 12,18Z" />
                    </svg>
                    <span className="font-bold text-sm ml-1 hidden sm:block">Applications</span>
                </button>

                {/* Workspaces (1, 2, 3, 4) - Kali XFCE style */}
                <div className="flex space-x-1 ml-4 border-l border-[#333] pl-2">
                    <div className="w-6 h-4 bg-[#333] border border-[#555] opacity-80 cursor-pointer"></div>
                    <div className="w-6 h-4 bg-[#111] border border-[#333] opacity-60 cursor-pointer hover:bg-[#222]"></div>
                </div>
            </div>

            {/* Right: System Tray & Clock */}
            <div className="flex items-center space-x-3 text-xs font-mono">
                <div className="hover:bg-[#333] p-1 rounded cursor-pointer">
                    {/* Network Icon */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M12,21L15.6,16.2C14.6,15.45 13.35,15 12,15C10.65,15 9.4,15.45 8.4,16.2L12,21M12,3C7.95,3 4.21,4.34 1.2,6.6L3,9C5.5,7.12 8.62,6 12,6C15.38,6 18.5,7.12 21,9L22.8,6.6C19.79,4.34 16.05,3 12,3M12,9C9.3,9 6.81,9.89 4.8,11.4L6.6,13.8C8.1,12.67 9.97,12 12,12C14.03,12 15.9,12.67 17.4,13.8L19.2,11.4C17.19,9.89 14.7,9 12,9Z" />
                    </svg>
                </div>
                <div className="hover:bg-[#333] p-1 rounded cursor-pointer">
                    {/* Volume Icon */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z" />
                    </svg>
                </div>

                <div className="pl-3 border-l border-[#333] h-full flex items-center text-gray-300">
                    {formattedTime}
                </div>

                <div className="hover:bg-red-900/50 p-1 rounded cursor-pointer ml-2">
                    {/* Power Icon */}
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                        <path d="M16.56,5.44L15.11,6.89C16.84,7.94 18,9.83 18,12A6,6 0 0,1 12,18A6,6 0 0,1 6,12C6,9.83 7.16,7.94 8.88,6.88L7.44,5.44C5.36,6.88 4,9.28 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12C20,9.28 18.64,6.88 16.56,5.44M13,3H11V13H13" />
                    </svg>
                </div>

            </div>
        </div>
    );
};

export default Taskbar;
