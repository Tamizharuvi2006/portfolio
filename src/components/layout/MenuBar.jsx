import React, { useState, useEffect } from 'react';
import { LayoutGrid, Battery, MessageCircle } from 'lucide-react';
import logo from '../../assets/logo-red.png';
import { useOS } from '../os/OSContext';

const MenuBar = ({ onOpenApp }) => {
    const { wallpaper } = useOS();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formattedTime = time.toLocaleString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-[90vw] md:max-w-fit">
            <div className="glass flex items-center justify-between md:justify-start h-14 pl-4 pr-6 rounded-full border border-white/10 shadow-2xl bg-[#111]/80 backdrop-blur-2xl transition-all hover:scale-[1.02] hover:bg-[#161616]/90 box-border">

                {/* Logo / Branding */}
                <div className="flex items-center space-x-3 pr-4 md:pr-6 md:mr-6 cursor-pointer" onClick={() => onOpenApp?.('readme')}>
                    <div className="w-18 h-18 md:w-28 md:h-28 flex items-center justify-center overflow-hidden p-0 flex-shrink-0">
                        <img src={wallpaper || logo} alt="Logo" className="w-full h-full object-contain transform scale-125" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-bold text-sm md:text-base text-white leading-tight tracking-wide">TAMIZH</span>
                        <span className="text-[9px] md:text-[10px] text-gray-400 uppercase tracking-widest font-semibold hidden sm:inline">Portfolio</span>
                    </div>
                </div>

                {/* Navigation / Status */}
                <div className="flex items-center space-x-3 md:space-x-6">
                    <div className="flex items-center space-x-2 md:space-x-3">
                        {/* Apps Button */}
                        <button
                            onClick={() => onOpenApp?.('apps')}
                            className="group relative p-2 rounded-full hover:bg-white/5 transition-colors"
                            title="All Apps"
                        >
                            <LayoutGrid size={18} className="text-gray-400 group-hover:text-white transition-colors" />
                            <span className="hidden md:absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Apps</span>
                        </button>

                        <div className="w-px h-4 bg-white/10"></div>

                        {/* Contact Button */}
                        <button
                            onClick={() => onOpenApp?.('socials')}
                            className="group relative p-2 rounded-full hover:bg-white/5 transition-colors"
                            title="Contact"
                        >
                            <div className="absolute inset-0 bg-accent-red opacity-0 group-hover:opacity-20 rounded-full transition-opacity"></div>
                            <MessageCircle size={18} className="text-gray-400 group-hover:text-accent-red transition-colors" />
                            <span className="hidden md:absolute -bottom-8 left-1/2 -translate-x-1/2 text-[10px] bg-black text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Contact</span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-6 bg-gradient-to-b from-transparent via-white/20 to-transparent hidden sm:block"></div>

                    {/* System Stats (Hidden on very small screens) */}
                    <div className="hidden sm:flex items-center space-x-3">
                        <Battery size={18} className="text-white" />
                        <span className="font-mono text-sm font-bold text-white/90 w-14 text-center">
                            {formattedTime}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;
