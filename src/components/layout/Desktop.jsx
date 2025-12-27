
import React from 'react';
import logo from '../../assets/logo-red.png';

import { useOS } from '../os/OSContext';

const Desktop = ({ children }) => {
    const { wallpaper } = useOS();
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        setMousePosition({
            x: (e.clientX - window.innerWidth / 2) / 50,
            y: (e.clientY - window.innerHeight / 2) / 50
        });
    };

    return (
        <div
            className="h-screen w-screen overflow-hidden relative selection:bg-red-500/30"
            onMouseMove={handleMouseMove}
        >
            {/* Background Image - Centered Logo with Parallax */}
            <div
                className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none transition-transform duration-100 ease-out will-change-transform"
                style={{
                    transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)`
                }}
            >
                <img
                    src={wallpaper || logo}
                    alt="Background"
                    className={`absolute ${wallpaper ? 'w-full h-full object-cover opacity-100' : 'w-[900px] h-[900px] opacity-25 object-contain'}`}
                />
            </div>

            {/* Dark Overlay/Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0d0d0d]/50 to-[#0d0d0d] z-0 pointer-events-none"></div>

            {/* Content */}
            <div className="relative z-10 h-full w-full">
                {children}
            </div>
        </div>
    );
};

export default Desktop;
