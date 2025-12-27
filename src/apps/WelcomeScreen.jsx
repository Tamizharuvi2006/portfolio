import React from 'react';
import { Command, Terminal, Sparkles } from 'lucide-react';

const WelcomeScreen = () => {
    return (
        <div className="h-full w-full overflow-y-auto bg-gradient-to-br from-[#1a1a1a] to-black text-white selection:bg-accent-red selection:text-white">
            <div className="min-h-full flex flex-col items-center justify-center p-8 text-center">

                <div className="mb-6 p-4 rounded-full bg-accent-red/10 border border-accent-red/20 shadow-[0_0_30px_rgba(255,59,48,0.2)] animate-pulse">
                    <Command size={48} className="text-accent-red" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                    Hey, I’m <span className="text-accent-red">Tamizh</span>
                </h1>

                <p className="text-gray-300 mb-6 max-w-2xl text-lg leading-relaxed">
                    A Full-Stack Developer crafting fast, modern, scalable web apps. I work across the MERN stack, build seamless UI/UX, and ship products that feel smooth, smart, and user-first. Always building, always leveling up 🚀
                </p>

                <div className="text-left bg-white/5 p-6 rounded-xl border border-white/10 max-w-3xl mb-8 w-full">
                    <h2 className="text-xl font-bold text-white mb-2 flex items-center">
                        About Me
                    </h2>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        I’m a passionate Full-Stack Developer who loves turning ideas into real, production-ready digital experiences. I enjoy building apps that feel modern, clean, and intuitive — from dashboards to SaaS tools to dynamic web systems.
                    </p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                        I’m currently pursuing B.E CSE (AI) at Sathyabama, and spending my time creating projects, polishing UI, improving performance, and learning systems that scale.
                    </p>
                    <p className="text-gray-300 text-sm font-medium italic border-l-2 border-accent-red pl-4">
                        &quot;Build fast. Build clean. Build something people will actually use.&quot;
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                    <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <Terminal className="text-accent-red mb-2" />
                        <span className="font-bold">Command Line</span>
                        <span className="text-xs text-gray-500 mt-1">For power users</span>
                    </div>
                    <div className="flex flex-col items-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                        <Sparkles className="text-yellow-500 mb-2" />
                        <span className="font-bold">Interactive</span>
                        <span className="text-xs text-gray-500 mt-1">Drag, Drop, Explore</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WelcomeScreen;
