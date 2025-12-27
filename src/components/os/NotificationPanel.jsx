import React from 'react';
import { motion } from 'framer-motion';
import { Mail, GitCommit, Zap, MessageSquare, Calendar } from 'lucide-react';

const notifications = [
    {
        id: 1,
        title: "New Email",
        subtitle: "Recruiter Enquiry",
        message: "Hey Tamizh, loved your portfolio! Are you open to new roles?",
        time: "Now",
        icon: Mail,
        color: "bg-blue-500",
        date: new Date()
    },
    {
        id: 2,
        title: "System Update",
        subtitle: "Portfolio OS v2.0",
        message: "Wallpaper engine and file previewer updated successfully.",
        time: "2m ago",
        icon: Zap,
        color: "bg-yellow-500",
        date: new Date(Date.now() - 120000)
    },
    {
        id: 3,
        title: "GitHub Activity",
        subtitle: "Push to Main",
        message: "feat: implemented dynamic shelf integration for minimized apps",
        time: "1h ago",
        icon: GitCommit,
        color: "bg-gray-800",
        date: new Date(Date.now() - 3600000)
    },
    {
        id: 4,
        title: "Calendar",
        subtitle: "Team Meeting",
        message: "Weekly sync with the design team regarding new assets.",
        time: "5:00 PM",
        icon: Calendar,
        color: "bg-red-500",
        date: new Date(Date.now() - 7200000)
    }
];

const NotificationPanel = () => {
    return (
        <div className="absolute top-20 right-4 w-80 flex flex-col space-y-4 pointer-events-none z-0">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-white/50 tracking-widest uppercase">Recents</span>
                <span className="text-[10px] text-white/30 bg-white/5 px-2 py-0.5 rounded-full backdrop-blur-sm">Clear All</span>
            </div>

            {/* Notifications List */}
            <div className="flex flex-col space-y-3 pointer-events-auto">
                {notifications.map((notif, index) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        whileHover={{ scale: 1.02 }}
                        className="glass-panel p-3 rounded-xl border border-white/10 bg-[#1a1a1a]/60 backdrop-blur-xl shadow-lg cursor-pointer group hover:bg-[#1a1a1a]/80 transition-colors"
                    >
                        <div className="flex items-start space-x-3">
                            {/* Icon */}
                            <div className={`w-9 h-9 rounded-full ${notif.color} flex items-center justify-center text-white shadow-md flex-shrink-0 mt-1`}>
                                <notif.icon size={16} />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-0.5">
                                    <h4 className="text-sm font-semibold text-white/90 truncate mr-2">{notif.title}</h4>
                                    <span className="text-[10px] text-white/40 font-medium whitespace-nowrap">{notif.time}</span>
                                </div>
                                <p className="text-xs text-white/70 font-medium mb-1 truncate">{notif.subtitle}</p>
                                <p className="text-[11px] text-white/50 leading-relaxed line-clamp-2">{notif.message}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default NotificationPanel;
