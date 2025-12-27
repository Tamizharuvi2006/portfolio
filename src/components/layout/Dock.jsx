import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Folder, Globe, FileText, Cpu, Mail, AppWindow } from 'lucide-react';
import { useOS } from '../os/OSContext';

const DockItem = ({ icon: Icon, label, onClick, isActive }) => {
    return (
        <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.2, y: -10 }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center group relative p-2"
            onClick={onClick}
        >
            {/* Tooltip */}
            <span className="absolute -top-12 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md border border-white/10 whitespace-nowrap z-50 pointer-events-none">
                {label}
            </span>

            {/* Icon Container - Darker, sleeker */}
            <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border shadow-lg backdrop-blur-sm transition-colors hover:bg-[#333] group-hover:border-accent-red/30 ${isActive ? 'bg-[#333] border-white/20' : 'bg-[#2b2b2b] border-white/5'}`}>
                <Icon className={`w-6 h-6 md:w-8 md:h-8 transition-colors ${isActive ? 'text-white' : 'text-gray-300 group-hover:text-accent-red'}`} strokeWidth={1.5} />
            </div>

            {/* Active Dot */}
            <div className={`w-1 h-1 bg-accent-red rounded-full mt-1 transition-opacity shadow-[0_0_5px_rgba(255,59,48,0.8)] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
        </motion.div>
    );
};

const Dock = ({ onOpenApp }) => {
    const { windows, restoreWindow } = useOS();

    const dockItems = [
        { id: 'finder', label: 'Files', icon: Folder },
        { id: 'browser', label: 'Web', icon: Globe },
        { id: 'terminal', label: 'Terminal', icon: Terminal },
        { id: 'skills', label: 'Skills', icon: Cpu },
        { id: 'projects', label: 'Projects', icon: FileText },
        { id: 'contact', label: 'Contact', icon: Mail },
    ];

    // Identify open apps to put a dot under static icons
    const openAppIds = windows.map(w => w.id === 'files' ? 'finder' : w.id);

    // Filter windows that are NOT in the static dock list (to show on the right)
    // OR just show minimized ones separately? MacOS shows minimized ones on the right.
    // Let's simpler: Show Divider -> Minimized Windows
    const minimizedWindows = windows.filter(w => w.minimized);

    return (
        <motion.div
            drag
            dragMomentum={false}
            className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 cursor-grab active:cursor-grabbing max-w-full overflow-x-auto no-scrollbar"
        >
            <div className="bg-[#1a1a1a]/80 backdrop-blur-md border border-white/5 flex items-end space-x-2 px-4 py-2 rounded-2xl h-20 md:h-24 shadow-2xl">
                {dockItems.map((item) => (
                    <DockItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={openAppIds.includes(item.id)}
                        onClick={() => onOpenApp(item.id === 'finder' ? 'files' : item.id)}
                    />
                ))}

                {/* Divider if there are minimized windows */}
                {minimizedWindows.length > 0 && (
                    <div className="flex items-center h-full pb-4 pl-2 pr-2">
                        <div className="w-[1px] h-10 bg-white/20"></div>
                    </div>
                )}

                {/* Minimized Windows Section */}
                {minimizedWindows.map((win) => (
                    <DockItem
                        key={win.id + '_min'}
                        icon={AppWindow} // Generic window icon for now, could be app specific if mapped
                        label={win.title}
                        isActive={false} // Minimized is not 'active' in the focused sense
                        onClick={() => restoreWindow(win.id)}
                    />
                ))}
            </div>
        </motion.div>
    );
};

export default Dock;
