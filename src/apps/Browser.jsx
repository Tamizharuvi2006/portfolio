import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Lock, Search, Star, MoreVertical } from 'lucide-react';
import { motion } from 'framer-motion';

const Browser = ({ onNavigate }) => {
    const [url] = useState('https://tamizh.portfolio');
    const [isLoading, setIsLoading] = useState(false);
    const [showContent, setShowContent] = useState(true);

    const handleReload = () => {
        setIsLoading(true);
        setShowContent(false);
        setTimeout(() => {
            setIsLoading(false);
            setShowContent(true);
        }, 1500);
    };

    return (
        <div className="h-full w-full flex flex-col bg-[#1e1e1e] text-white font-sans">
            {/* Browser Toolbar */}
            <div className="bg-[#2b2b2b] border-b border-white/5 p-2 flex items-center space-x-3">
                <div className="flex space-x-2 text-gray-400">
                    <ArrowLeft size={18} className="cursor-not-allowed opacity-50" />
                    <ArrowRight size={18} className="cursor-not-allowed opacity-50" />
                    <RotateCcw size={18} className="cursor-pointer hover:text-white transition-colors" onClick={handleReload} />
                </div>

                {/* Secure Address Bar */}
                <div className="flex-1 bg-[#1a1a1a] rounded-full px-4 py-1.5 flex items-center border border-white/5 focus-within:border-accent-red/50 transition-colors group">
                    <Lock size={14} className="text-green-500 mr-2" />
                    <span className="text-xs text-green-500 font-mono mr-2">Secure |</span>
                    <input
                        type="text"
                        value={url}
                        readOnly
                        className="bg-transparent border-none outline-none text-sm w-full text-gray-300 font-mono group-hover:text-white transition-colors cursor-default"
                    />
                    <Star size={14} className="text-yellow-500 ml-2" />
                </div>

                <div className="flex items-center space-x-3 text-gray-400">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-accent-red to-orange-500 flex items-center justify-center text-[10px] font-bold text-white">T</div>
                    <MoreVertical size={18} />
                </div>
            </div>

            {/* Browser Content / Viewport */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative bg-black">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#111] z-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-red"></div>
                    </div>
                )}

                {showContent && (
                    <div className="animate-fadeIn">
                        {/* Hero Section */}
                        <div className="bg-gradient-to-b from-[#111] to-[#0d0d0d] py-20 px-8 text-center border-b border-white/5">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight"
                            >
                                Tamizh<span className="text-accent-red">.dev</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-xl text-gray-400 max-w-2xl mx-auto"
                            >
                                Building digital experiences that merge clean code with stunning design.
                            </motion.p>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="mt-8 flex justify-center space-x-4"
                            >
                                <button
                                    onClick={() => onNavigate && onNavigate('projects')}
                                    className="px-6 py-2 bg-accent-red hover:bg-red-600 rounded-full font-medium transition-colors"
                                >
                                    View Projects
                                </button>
                                <button
                                    onClick={() => window.location.href = 'mailto:aruvi2908@gmail.com'}
                                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full font-medium transition-colors border border-white/10"
                                >
                                    Contact Me
                                </button>
                            </motion.div>
                        </div>

                        {/* About Layout */}
                        <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Feature 1 */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-red/30 transition-colors">
                                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 text-blue-400 mb-4">
                                    <Search size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Modern Stack</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Specialized in React, Next.js, and scaling Node.js applications. Always using the latest robust technologies.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-red/30 transition-colors">
                                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 text-green-400 mb-4">
                                    <Lock size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Security First</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    With a background in Kali Linux and Cybersecurity, I build apps that are secure by design, not by accident.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-red/30 transition-colors">
                                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4 text-purple-400 mb-4">
                                    <Star size={24} />
                                </div>
                                <h3 className="text-xl font-bold mb-2">Premium UX</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Obsessed with micro-interactions, animations, and providing a fluid, native-like feel on the web.
                                </p>
                            </div>
                        </div>

                        {/* Recent Updates / Mini Blog */}
                        <div className="bg-[#0f0f0f] py-16 border-t border-white/5">
                            <div className="max-w-4xl mx-auto px-6">
                                <h2 className="text-3xl font-bold mb-8 flex items-center">
                                    <span className="w-1 h-8 bg-accent-red mr-4 rounded-full"></span>
                                    Latest Updates
                                </h2>
                                <div className="space-y-6">
                                    <div className="flex gap-4 items-start pb-6 border-b border-white/5">
                                        <div className="min-w-[4rem] text-sm text-gray-500 font-mono pt-1">Dec 12</div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white mb-1">Portfolio OS v2.0 Launched</h4>
                                            <p className="text-gray-400">Rebuilt the entire portfolio using a desktop metaphor. Added working terminal, window manager, and dynamic apps.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-start pb-6 border-b border-white/5">
                                        <div className="min-w-[4rem] text-sm text-gray-500 font-mono pt-1">Nov 28</div>
                                        <div>
                                            <h4 className="font-bold text-lg text-white mb-1">AI Integration Experiments</h4>
                                            <p className="text-gray-400">Started integrating local LLMs with web interfaces for more intelligent user interactions.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5 bg-[#0a0a0a]">
                            <p>© 2025 Tamizharuvi. Built with React & Curiosity.</p>
                        </footer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Browser;
