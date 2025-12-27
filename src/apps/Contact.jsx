import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
    const [result, setResult] = useState("");
    const [status, setStatus] = useState("idle"); // idle, loading, success, error

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending message...");
        setStatus("loading");

        const formData = new FormData(event.target);
        formData.append("access_key", "177b54e2-67bd-4bf1-89f4-5c252405cde9");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (data.success) {
                setResult("Message sent successfully!");
                setStatus("success");
                event.target.reset();
                setTimeout(() => setStatus("idle"), 3000);
            } else {
                setResult("Error sending message. Please try again.");
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setResult("Network error. Please try again later.");
            setStatus("error");
        }
    };

    return (
        <div className="h-full w-full bg-[#111] overflow-y-auto custom-scrollbar flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Get in Touch</h1>
                    <p className="text-gray-400">Have a project in mind or just want to say hi? Send me a message!</p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#1a1a1a]/80 backdrop-blur-xl p-6 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    {/* Decorative Gradient Blob */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-red/20 rounded-full blur-3xl rounded-full pointer-events-none"></div>

                    <form onSubmit={onSubmit} className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <User size={16} className="text-accent-red" /> Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <Mail size={16} className="text-accent-red" /> Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red/50 transition-all placeholder-gray-500 hover:bg-white/10"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-300 flex items-center gap-2">
                                <MessageSquare size={16} className="text-accent-red" /> Message
                            </label>
                            <textarea
                                name="message"
                                required
                                rows="5"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red/50 transition-all placeholder-gray-500 resize-none hover:bg-white/10"
                                placeholder="Tell me about your project..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform hover:-translate-y-1 active:scale-95 shadow-lg ${status === 'loading'
                                ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                                : 'bg-gradient-to-r from-accent-red to-[#d0281b] text-white hover:shadow-accent-red/40'
                                }`}
                        >
                            {status === 'loading' ? (
                                <>Sending...</>
                            ) : (
                                <><Send size={18} /> Send Message Box</>
                            )}
                        </button>

                        {/* Status Message */}
                        {status !== 'idle' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center justify-center gap-2 text-sm p-4 rounded-xl font-medium ${status === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                    status === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : ''
                                    }`}
                            >
                                {status === 'success' && <CheckCircle size={18} />}
                                {status === 'error' && <AlertCircle size={18} />}
                                {result}
                            </motion.div>
                        )}
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4">
                        <a href="https://www.linkedin.com/in/tamizharuvi-p-946663287/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-[#0077b5]/20 hover:text-[#0077b5] transition-all group">
                            <User size={24} className="text-gray-400 group-hover:text-[#0077b5]" />
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white">LinkedIn</span>
                        </a>
                        <a href="https://github.com/Tamizharuvi2006" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group">
                            <User size={24} className="text-gray-400 group-hover:text-white" />
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white">GitHub</span>
                        </a>
                        <a href="https://wa.me/6381353913?text=Hi" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-[#25D366]/20 hover:text-[#25D366] transition-all group">
                            <User size={24} className="text-gray-400 group-hover:text-[#25D366]" />
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white">WhatsApp</span>
                        </a>
                        <a href="mailto:aruvi2908@gmail.com" className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-accent-red/20 hover:text-accent-red transition-all group">
                            <Mail size={24} className="text-gray-400 group-hover:text-accent-red" />
                            <span className="text-xs font-medium text-gray-400 group-hover:text-white">Email</span>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
