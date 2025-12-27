import React from 'react';
import { Terminal, FolderOpen, Globe, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

const DesktopIcon = ({ label, iconInfo, onClick }) => {
    const isImage = typeof iconInfo === 'string' && (iconInfo.includes('/') || iconInfo.includes('data:'));

    // Fallback components if not an image path
    const IconComponent = iconInfo === 'terminal' ? Terminal :
        iconInfo === 'folder' ? FolderOpen :
            iconInfo === 'browser' ? Globe : FileText;

    return (
        <motion.div
            drag
            dragMomentum={false}
            className="w-20 md:w-24 flex flex-col items-center p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer group mb-6 transition-colors duration-200 absolute"
            style={{ position: 'relative' }} // Use relative positioning for flow, but drag uses transform
            onClick={onClick}
        >
            <div className="w-12 h-12 md:w-14 md:h-14 mb-3 text-white/90 group-hover:text-white drop-shadow-2xl transition-transform duration-300 group-hover:scale-110 flex items-center justify-center bg-gradient-to-br from-white/5 to-white/0 rounded-2xl border border-white/5 group-hover:border-accent-red/30 shadow-lg backdrop-blur-sm group-hover:shadow-[0_0_20px_rgba(255,59,48,0.2)]">
                {isImage ? (
                    <img src={iconInfo} alt={label} className="w-4/5 h-4/5 object-contain filter drop-shadow-lg" />
                ) : (
                    <IconComponent className="w-3/5 h-3/5 text-gray-200 group-hover:text-accent-red transition-colors" strokeWidth={1.5} />
                )}
            </div>
            <span className="text-white text-[11px] md:text-sm font-medium text-center drop-shadow-md select-none bg-black/40 backdrop-blur-md rounded-md px-3 py-1 border border-white/5 group-hover:border-accent-red/20 group-hover:text-white transition-all w-full truncate max-w-full">
                {label}
            </span>
        </motion.div>
    );
};

export default DesktopIcon;
