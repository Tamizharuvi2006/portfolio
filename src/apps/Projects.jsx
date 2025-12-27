import React from 'react';
import { Github, ExternalLink, Code, Star, GitFork } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: "Luxe",
        description: "A comprehensive E-commerce platform built with modern web technologies, offering a seamless shopping experience.",
        tags: ["React", "E-commerce", "Stripe"],
        github: "https://github.com/Tamizharuvi2006",
        demo: "#",
        stars: 12,
        forks: 2,
        color: "from-pink-500 to-rose-500"
    },
    {
        id: 2,
        title: "Relyce Infotech",
        description: "A professional consultancy website aimed at providing top-tier IT solutions and business strategies.",
        tags: ["React", "Business", "UI/UX"],
        github: "https://github.com/Tamizharuvi2006",
        demo: "#",
        stars: 8,
        forks: 1,
        color: "from-blue-500 to-cyan-500"
    },
    {
        id: 3,
        title: "Airi",
        description: "An intelligent Voice Assistant built using Python, capable of performing various system tasks and answering queries.",
        tags: ["Python", "AI", "Voice Rec"],
        github: "https://github.com/Tamizharuvi2006",
        demo: "#",
        stars: 25,
        forks: 5,
        color: "from-green-500 to-emerald-500"
    },
    {
        id: 4,
        title: "AI Chatbot",
        description: "An advanced AI-powered chatbot currently in active development, designed to provide human-like conversational abilities.",
        tags: ["Development", "AI", "NLP"],
        github: "https://github.com/Tamizharuvi2006",
        demo: "#",
        stars: 43,
        forks: 8,
        color: "from-purple-500 to-violet-500"
    },
    {
        id: 5,
        title: "WebPrompt",
        description: "A powerful prompt generator application designed to streamline AI interactions, built with modern web technologies.",
        tags: ["TypeScript", "Vite", "Supabase"],
        github: "https://github.com/Tamizharuvi2006",
        demo: "#",
        stars: 5,
        forks: 1,
        color: "from-indigo-500 to-blue-500"
    }
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="bg-[#1a1a1a] border border-white/5 rounded-xl overflow-hidden hover:border-accent-red/30 transition-all group flex flex-col h-full"
    >
        <div className={`h-32 bg-gradient-to-br ${project.color} p-4 flex items-end relative overflow-hidden`}>
            {/* Removed the large icon as requested */}
            <div className="relative z-10 w-full">
                <h3 className="text-xl font-bold text-white mb-1 shadow-black/50 drop-shadow-md">{project.title}</h3>
            </div>
        </div>

        <div className="p-4 flex-1 flex flex-col">
            <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-2 py-1 rounded bg-white/5 text-gray-300 border border-white/5">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center space-x-3 text-gray-500 text-xs">
                    <div className="flex items-center space-x-1">
                        <Star size={12} />
                        <span>{project.stars}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    <a href={project.github} className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <Github size={16} />
                    </a>
                </div>
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <div className="h-full w-full bg-[#111] overflow-y-auto custom-scrollbar">
            <div className="max-w-6xl mx-auto p-4 md:p-8">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-2">My Projects</h2>
                    <p className="text-gray-400">A collection of my recent work in web development, security, and design.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
