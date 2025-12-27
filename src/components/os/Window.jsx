import React from 'react';
import { Rnd } from 'react-rnd';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from './OSContext';

const Window = ({ id, title, children, zIndex, isActive, isMinimized, defaultSize = { width: 700, height: 500 }, defaultPosition = { x: 100, y: 80 } }) => {
    const { closeWindow, focusWindow, minimizeWindow, maximizeWindow } = useOS();

    return (
        <Rnd
            default={{
                x: defaultPosition.x,
                y: defaultPosition.y,
                width: Math.min(defaultSize.width, window.innerWidth - 20),
                height: defaultSize.height,
            }}
            minWidth={280}
            minHeight={200}
            bounds="parent"
            onDragStart={() => focusWindow(id)}
            style={{
                zIndex,
                display: isMinimized ? 'none' : 'block' // Simple hiding for now to preserve state
            }}
            className="pointer-events-auto"
            dragHandleClassName="window-drag-handle"
            cancel=".no-drag"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20, filter: 'blur(10px)' }}
                animate={isMinimized ?
                    { opacity: 0, scale: 0, y: 500, transition: { duration: 0.3 } } :
                    { opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }
                }
                exit={{ opacity: 0, scale: 0.7, y: 50, filter: 'blur(10px)' }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex flex-col rounded-xl overflow-hidden shadow-2xl border ${isActive ? 'border-gray-500/30' : 'border-white/10'} glass w-full h-full`}
            >
                {/* Title Bar - macOS Style */}
                <div
                    className="window-drag-handle h-10 flex items-center px-4 select-none relative bg-white/5 backdrop-blur-md cursor-grab active:cursor-grabbing"
                    onMouseDown={() => focusWindow(id)}
                    onTouchStart={() => focusWindow(id)}
                >
                    {/* Traffic Lights */}
                    <div className="flex items-center space-x-1 absolute left-2 z-50 group/controls no-drag">
                        {/* Close */}
                        <div
                            className="p-2 cursor-pointer no-drag"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeWindow(id);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 border border-[#E0443E] shadow-sm flex items-center justify-center transition-transform active:scale-90">
                                <span className="opacity-40 group-hover/controls:opacity-100 text-[9px] font-bold text-black/60 pt-[1px]">×</span>
                            </div>
                        </div>

                        {/* Minimize */}
                        <div
                            className="p-2 cursor-pointer no-drag"
                            onClick={(e) => {
                                e.stopPropagation();
                                minimizeWindow(id);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 border border-[#DEA123] shadow-sm flex items-center justify-center transition-transform active:scale-90">
                                <span className="opacity-40 group-hover/controls:opacity-100 text-[9px] font-bold text-black/60 pt-[1px]">-</span>
                            </div>
                        </div>

                        {/* Maximize */}
                        <div
                            className="p-2 cursor-pointer no-drag"
                            onClick={(e) => {
                                e.stopPropagation();
                                maximizeWindow?.(id);
                            }}
                            onPointerDown={(e) => e.stopPropagation()}
                        >
                            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 border border-[#1AAB29] shadow-sm flex items-center justify-center transition-transform active:scale-90">
                                <span className="opacity-40 group-hover/controls:opacity-100 text-[8px] font-bold text-black/60 pt-[1px]">+</span>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <div className="w-full text-center text-sm font-semibold opacity-90">{title}</div>
                </div>

                {/* Content Area */}
                <div className={`flex-1 relative overflow-hidden ${id === 'terminal' ? 'bg-[#1a1a1a]/95' : 'bg-white/80'}`}>
                    {children}
                </div>
            </motion.div>
        </Rnd>
    );
};

export default Window;
