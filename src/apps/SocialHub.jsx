import React from 'react';
import { Linkedin, MessageCircle, Mail, ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialCard = ({ icon: Icon, label, subLabel, color, link, delay }) => (
    <motion.a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.3 }}
        className="flex items-center p-3 md:p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
    >
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mr-3 md:mr-4 shadow-lg ${color} group-hover:scale-110 transition-transform`}>
            <Icon size={20} className="text-white md:w-6 md:h-6" fill="currentColor" />
        </div>
        <div className="flex-1">
            <h3 className="font-bold text-white text-base md:text-lg">{label}</h3>
            <p className="text-gray-400 text-[10px] md:text-xs">{subLabel}</p>
        </div>
        <ExternalLink size={14} className="text-gray-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100 md:w-4 md:h-4" />
    </motion.a>
);

const SocialHub = () => {
    return (
        <div className="h-full w-full p-4 md:p-8 bg-gradient-to-br from-[#111] to-black text-white flex flex-col items-center overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-6 md:mb-8"
            >
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-accent-red to-orange-600 rounded-full mx-auto mb-3 md:mb-4 p-1 shadow-2xl shadow-red-900/50">
                    <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Tamizh"
                        alt="Tamizh"
                        className="w-full h-full rounded-full bg-black/50"
                    />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold mb-1">Let&apos;s Connect</h2>
                <p className="text-gray-400 text-sm md:text-base">Available for freelance & collaborations</p>
            </motion.div>

            <div className="w-full max-w-md space-y-4">
                <SocialCard
                    icon={Linkedin}
                    label="LinkedIn"
                    subLabel="Professional Profile"
                    color="bg-[#0077b5]"
                    link="https://www.linkedin.com/in/tamizharuvi-p-946663287/"
                    delay={0.1}
                />
                <SocialCard
                    icon={MessageCircle}
                    label="WhatsApp"
                    subLabel="+91 6381353913"
                    color="bg-[#25D366]"
                    link="https://wa.me/6381353913?text=Hi"
                    delay={0.2}
                />
                <SocialCard
                    icon={Github}
                    label="GitHub"
                    subLabel="Check my repos"
                    color="bg-[#333]"
                    link="https://github.com/Tamizharuvi2006"
                    delay={0.3}
                />
                <SocialCard
                    icon={Mail}
                    label="Email"
                    subLabel="aruvi2908@gmail.com"
                    color="bg-red-600"
                    link="mailto:aruvi2908@gmail.com"
                    delay={0.4}
                />
            </div>
        </div>
    );
};

export default SocialHub;
