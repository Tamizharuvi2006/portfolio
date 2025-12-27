import React from 'react';
import { motion } from 'framer-motion';
import { Code, Terminal, Database, Layout, Server, Shield, Award, Briefcase, GraduationCap, PenTool } from 'lucide-react';

const SkillBar = ({ skill, level, color }) => (
    <div className="mb-3">
        <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-300">{skill}</span>
            <span className="text-xs text-gray-500">{level}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${level}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`h-2 rounded-full ${color}`}
            />
        </div>
    </div>
);

const SectionTitle = ({ icon: Icon, title }) => (
    <div className="flex items-center space-x-2 mb-4 text-accent-red border-b border-white/10 pb-2">
        <Icon size={20} />
        <h3 className="font-bold text-lg">{title}</h3>
    </div>
);

const TimelineItem = ({ title, subtitle, date, description }) => (
    <div className="relative pl-6 pb-6 border-l border-white/10 last:pb-0 last:border-0">
        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-accent-red"></div>
        <h4 className="font-bold text-white">{title}</h4>
        <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-400 font-medium">{subtitle}</span>
            <span className="text-xs text-gray-500 font-mono bg-white/5 px-2 py-0.5 rounded">{date}</span>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
    </div>
);

const Skills = () => {
    return (
        <div className="h-full w-full bg-[#111] text-gray-300 overflow-y-auto custom-scrollbar">
            <div className="max-w-5xl mx-auto p-6 md:p-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-2">Tamizharuvi</h1>
                    <p className="text-accent-red font-mono mb-4">Full Stack Developer & AI Enthusiast</p>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm italic">
                        &quot;Build fast. Build clean. Build something people will actually use.&quot;
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {/* Left Column - Skills */}
                    <div>
                        <section className="mb-8">
                            <SectionTitle icon={Layout} title="Frontend" />
                            <div className="space-y-4">
                                <SkillBar skill="React.js / Next.js" level={95} color="bg-blue-400" />
                                <SkillBar skill="Tailwind CSS" level={90} color="bg-cyan-400" />
                                <SkillBar skill="JavaScript (ES6+)" level={92} color="bg-yellow-400" />
                                <SkillBar skill="Responsive UI/UX" level={88} color="bg-orange-400" />
                                <SkillBar skill="Vite" level={85} color="bg-purple-500" />
                            </div>
                        </section>

                        <section className="mb-8">
                            <SectionTitle icon={Server} title="Backend" />
                            <div className="space-y-4">
                                <SkillBar skill="Node.js" level={85} color="bg-green-500" />
                                <SkillBar skill="Express.js" level={82} color="bg-gray-400" />
                                <SkillBar skill="REST APIs" level={90} color="bg-indigo-400" />
                                <SkillBar skill="Auth & JWT" level={80} color="bg-red-400" />
                            </div>
                        </section>

                        <section className="mb-8">
                            <SectionTitle icon={Database} title="Database" />
                            <div className="flex flex-wrap gap-2">
                                {['MongoDB', 'SQL', 'Supabase', 'Firestore'].map(db => (
                                    <span key={db} className="px-3 py-1 bg-white/5 rounded-lg text-sm font-medium border border-white/5 text-emerald-400">
                                        {db}
                                    </span>
                                ))}
                            </div>
                        </section>
                    </div>

                    {/* Right Column - Tools & Educatoin */}
                    <div>
                        <section className="mb-8">
                            <SectionTitle icon={Terminal} title="Full-Stack & Tools" />
                            <div className="flex flex-wrap gap-2 mb-6">
                                {['Git & GitHub', 'Postman', 'Vercel', 'Netlify', 'Render', 'Firebase Auth', 'Supabase Auth'].map(tool => (
                                    <span key={tool} className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium hover:bg-white/10 transition-colors">
                                        {tool}
                                    </span>
                                ))}
                            </div>
                        </section>

                        <section className="mb-8">
                            <SectionTitle icon={GraduationCap} title="Education" />
                            <div className="mt-4">
                                <TimelineItem
                                    title="B.E CSE (AI)"
                                    subtitle="Sathyabama Institute of Science and Technology"
                                    date="Present"
                                    description="Focusing on Artificial Intelligence, System Architecture, and Full Stack Development. Creating projects and leveling up daily."
                                />
                            </div>
                        </section>

                        <section>
                            <SectionTitle icon={Briefcase} title="What I Do" />
                            <div className="space-y-3">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-bold text-white mb-1 flex items-center"><Code className="mr-2 text-accent-red" size={16} /> Web Development</h4>
                                    <p className="text-gray-400 text-sm">Building fast, responsive, and interactive websites using modern frameworks.</p>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                    <h4 className="font-bold text-white mb-1 flex items-center"><PenTool className="mr-2 text-accent-red" size={16} /> UI/UX Design</h4>
                                    <p className="text-gray-400 text-sm">Crafting intuitive and consistent user interfaces with a focus on user experience.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Skills;
