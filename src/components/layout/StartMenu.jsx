import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Power, Settings, User, Terminal, Folder, Globe, Cpu, FileText, Mail } from 'lucide-react';

const apps = [
    { id: 'terminal', name: 'Terminal', icon: Terminal, color: 'text-gray-300' },
    { id: 'files', name: 'File Manager', icon: Folder, color: 'text-blue-400' },
    { id: 'browser', name: 'Safari', icon: Globe, color: 'text-blue-500' },
    { id: 'skills', name: 'Skills', icon: Cpu, color: 'text-purple-400' },
    { id: 'projects', name: 'Projects', icon: FileText, color: 'text-yellow-400' },
    { id: 'contact', name: 'Mail', icon: Mail, color: 'text-accent-red' },
];

const StartMenu = ({ isOpen, onClose, onOpenApp }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredApps = apps.filter(app =>
        app.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
                        onClick={onClose}
                    />

                    {/* Menu Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[640px] h-[80vh] max-h-[500px] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden"
                    >
                        {/* Search Bar */}
                        <div className="p-4 md:p-6 pb-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search apps..."
                                    className="w-full bg-[#2a2a2a] border border-white/5 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-red/50 transition-all text-sm md:text-base"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* Pinned Apps Grid */}
                        <div className="flex-1 overflow-y-auto p-4 md:p-6 pt-2">
                            <div className="text-xs font-semibold text-gray-500 mb-4 px-2 uppercase tracking-wider">Pinned</div>
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 md:gap-4">
                                {filteredApps.map(app => (
                                    <button
                                        key={app.id}
                                        className="flex flex-col items-center p-3 rounded-lg hover:bg-white/5 transition-colors group space-y-2 active:scale-95 transition-transform"
                                        onClick={() => {
                                            onOpenApp(app.id);
                                            onClose();
                                        }}
                                    >
                                        <div className="w-12 h-12 bg-[#252525] rounded-xl flex items-center justify-center shadow-lg border border-white/5 group-hover:scale-105 transition-transform group-hover:border-accent-red/50">
                                            <app.icon className={`w-6 h-6 ${app.color}`} />
                                        </div>
                                        <span className="text-xs text-gray-300 font-medium group-hover:text-white text-center">{app.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recommended / Footer */}
                        <div className="h-16 bg-[#111]/50 border-t border-white/5 flex items-center justify-between px-8 mt-auto">
                            <div className="flex items-center space-x-3 group cursor-pointer hover:bg-white/5 p-2 px-3 rounded-lg -ml-3 transition-colors">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-red to-orange-600 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                                    T
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-semibold text-white group-hover:text-accent-red transition-colors">Tamizh</span>
                                    <span className="text-[10px] text-gray-500">Administrator</span>
                                </div>
                            </div>

                            <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors">
                                <Power size={20} />
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default StartMenu;
