import React, { useState } from 'react';
import { fileSystem } from './filesystem';
import { Folder, FileText, ArrowLeft, ArrowRight, Home, HardDrive, Clock, Cloud, Search, ChevronRight, LayoutGrid, List as ListIcon, Image as ImageIcon, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOS } from '../components/os/OSContext';

const FileManager = ({ onNavigate }) => {
    const [currentPath, setCurrentPath] = useState(['Macintosh HD', 'Users', 'Tamizh']);
    const [viewMode, setViewMode] = useState('grid');
    const [previewFile, setPreviewFile] = useState(null); // { name, type, content }
    const { setWallpaper } = useOS();

    const getDir = (pathArray) => {
        let current = fileSystem;
        for (const dir of pathArray) {
            if (current[dir]) {
                current = current[dir];
            } else if (current.children && current.children[dir]) {
                current = current.children[dir];
            } else {
                return null;
            }
        }
        return current;
    };

    const currentDirObj = getDir(currentPath);
    const items = currentDirObj ? (currentDirObj.children || currentDirObj) : {};

    const handleNavigate = (name, type, item) => {
        // Specific App Interceptors
        if (name === 'about_me.md') {
            onNavigate && onNavigate('readme');
            return;
        }
        if (name === 'skills_and_tools.txt') {
            onNavigate && onNavigate('skills');
            return;
        }

        // Open Contact Info in "Notepad" (Preview Modal)
        if (name === 'contact_info.json') {
            setPreviewFile({ name, type: 'text', content: item.content });
            return;
        }

        if (type === 'directory' || (items[name] && items[name].type === 'directory')) {
            setCurrentPath([...currentPath, name]);
        } else if (type === 'image') {
            setPreviewFile({ name, type: 'image', content: item.content });
        } else if (type === 'pdf') {
            setPreviewFile({ name, type: 'pdf', content: item.content });
        } else if (type === 'file') {
            // Generic text file opener
            setPreviewFile({ name, type: 'text', content: item.content });
        } else {
            console.log("Unknown file type:", name);
        }
    };

    const goBack = () => {
        if (currentPath.length > 1) {
            setCurrentPath(prev => prev.slice(0, -1));
        }
    };

    return (
        <div className="flex h-full bg-[#f5f5f7] text-black font-sans text-sm overflow-hidden rounded-b-lg relative">
            {/* Sidebar */}
            <div className="w-52 bg-[#e8e8ea]/80 backdrop-blur-xl border-r border-[#d4d4d4] flex flex-col pt-5 pl-3 pr-2 shadow-[inset_-1px_0_0_rgba(0,0,0,0.05)]">
                <div className="text-[11px] font-bold text-gray-500 mb-2 px-2 uppercase tracking-wider">Favorites</div>
                <SidebarItem icon={Home} label="Home" active={currentPath[currentPath.length - 1] === 'Tamizh'} onClick={() => setCurrentPath(['Macintosh HD', 'Users', 'Tamizh'])} />
                <SidebarItem icon={HardDrive} label="Macintosh HD" active={currentPath.length === 1 && currentPath[0] === 'Macintosh HD'} onClick={() => setCurrentPath(['Macintosh HD'])} />
                <SidebarItem icon={Folder} label="Projects" active={currentPath.includes('Projects')} onClick={() => setCurrentPath(['Macintosh HD', 'Users', 'Tamizh', 'Projects'])} />
                <SidebarItem icon={FileText} label="Documents" active={currentPath.includes('Documents')} onClick={() => setCurrentPath(['Macintosh HD', 'Users', 'Tamizh', 'Documents'])} />
                <SidebarItem icon={Clock} label="Recents" active={false} />

                <div className="text-[11px] font-bold text-gray-500 mt-6 mb-2 px-2 uppercase tracking-wider">Cloud</div>
                <SidebarItem icon={Cloud} label="Cloud" active={currentPath[0] === 'Cloud'} onClick={() => setCurrentPath(['Cloud'])} />
                <SidebarItem icon={ImageIcon} label="Photos" active={currentPath.includes('Photos')} onClick={() => setCurrentPath(['Cloud', 'Photos'])} />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col bg-white">
                {/* Toolbar */}
                <div className="h-12 border-b border-[#e5e5e5] flex items-center px-4 justify-between bg-[#fbfbfb]">
                    <div className="flex items-center space-x-4">
                        <div className="flex space-x-1 text-gray-500">
                            <button onClick={goBack} disabled={currentPath.length <= 1} className="p-1.5 rounded-md hover:bg-black/5 disabled:opacity-30 transition-colors">
                                <ArrowLeft size={16} />
                            </button>
                            <button className="p-1.5 rounded-md hover:bg-black/5 disabled:opacity-30 transition-colors" disabled>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                        <div className="text-lg font-semibold text-gray-800 tracking-tight">
                            {currentPath[currentPath.length - 1]}
                        </div>
                    </div>
                    {/* View Toggles & Search */}
                    <div className="flex items-center space-x-3">
                        <div className="flex bg-[#eaeaec] p-0.5 rounded-md text-gray-500">
                            <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-800' : 'hover:bg-black/5'}`}>
                                <LayoutGrid size={15} />
                            </button>
                            <button onClick={() => setViewMode('list')} className={`p-1 rounded ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-800' : 'hover:bg-black/5'}`}>
                                <ListIcon size={15} />
                            </button>
                        </div>
                        <input type="text" placeholder="Search" className="bg-[#eaeaec] pl-3 pr-3 py-1.5 rounded-md text-sm w-40 focus:w-56 outline-none transition-all placeholder:text-gray-400" />
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="h-8 border-b border-[#f0f0f0] flex items-center px-4 space-x-2 text-xs text-gray-500 bg-white">
                    {currentPath.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span
                                className={`hover:bg-gray-100 px-1.5 py-0.5 rounded cursor-pointer ${index === currentPath.length - 1 ? 'font-semibold text-gray-800' : ''}`}
                                onClick={() => setCurrentPath(currentPath.slice(0, index + 1))}
                            >
                                {crumb}
                            </span>
                            {index < currentPath.length - 1 && <ChevronRight size={12} className="text-gray-300" />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Content Area */}
                <div className="flex-1 p-4 overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentPath.join('/') + viewMode}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.1 }}
                            className={viewMode === 'grid' ? "grid grid-cols-4 md:grid-cols-5 gap-4" : "flex flex-col space-y-1"}
                        >
                            {Object.keys(items).filter(k => k !== 'type' && k !== 'content').map(key => {
                                const item = items[key];
                                const isDir = item.type === 'directory' || (typeof item === 'object' && item.type !== 'file' && item.type !== 'image' && item.type !== 'pdf');
                                return (
                                    <FileItem
                                        key={key} name={key} item={item} type={isDir ? 'directory' : item.type || 'file'} viewMode={viewMode}
                                        onDoubleClick={() => handleNavigate(key, isDir ? 'directory' : item.type || 'file', item)}
                                    />
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <div className="h-6 bg-[#fbfbfb] border-t border-[#e5e5e5] flex items-center px-4 text-[10px] text-gray-500">
                    {Object.keys(items).filter(k => k !== 'type' && k !== 'content').length} items
                </div>
            </div>

            {/* File Preview Modal */}
            <AnimatePresence>
                {previewFile && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="absolute inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-8"
                        onClick={(e) => { if (e.target === e.currentTarget) setPreviewFile(null); }}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl h-[85vh] flex flex-col"
                        >
                            <div className="h-10 border-b flex items-center justify-between px-4 bg-[#f5f5f7]">
                                <span className="font-semibold text-gray-700">{previewFile.name}</span>
                                <button onClick={() => setPreviewFile(null)} className="p-1 hover:bg-gray-200 rounded-full">
                                    <X size={16} className="text-gray-500" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-auto p-0 bg-[#fafafa] flex items-center justify-center relative">
                                {previewFile.type === 'image' ? (
                                    <div className="relative w-full h-full flex flex-col">
                                        <div className="flex-1 flex items-center justify-center bg-transparent pattern-grid p-4">
                                            <img src={previewFile.content} alt={previewFile.name} className="max-w-full max-h-full object-contain shadow-lg" />
                                        </div>
                                        <div className="h-14 border-t bg-white flex items-center justify-between px-6">
                                            <span className="text-xs text-gray-400">Rate this wallpaper?</span>
                                            <button
                                                onClick={() => { setWallpaper(previewFile.content); alert('Wallpaper Updated!'); }}
                                                className="bg-accent-red text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-red-600 transition-colors flex items-center"
                                            >
                                                <Check size={14} className="mr-2" /> Set as Wallpaper
                                            </button>
                                        </div>
                                    </div>
                                ) : previewFile.type === 'pdf' ? (
                                    <iframe src={previewFile.content} className="w-full h-full border-none" title="PDF Preview"></iframe>
                                ) : (
                                    <div className="w-full h-full p-6 bg-white overflow-auto font-mono text-sm text-gray-800 whitespace-pre-wrap">
                                        {previewFile.content}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
    <div onClick={onClick} className={`flex items-center space-x-3 px-3 py-1.5 rounded-md mx-2 mb-0.5 cursor-pointer transition-colors ${active ? 'bg-[#d8d8dad0] text-gray-800' : 'text-gray-600 hover:bg-black/5'}`}>
        <Icon size={16} className={active ? 'text-gray-800' : 'text-gray-500'} strokeWidth={active ? 2 : 1.5} />
        <span className="font-medium">{label}</span>
    </div>
);

const FileItem = ({ name, item, type, viewMode, onDoubleClick }) => {
    if (viewMode === 'list') {
        return (
            <div onDoubleClick={onDoubleClick} className="flex items-center p-1.5 hover:bg-blue-500/10 rounded cursor-pointer group text-sm border border-transparent hover:border-blue-500/20">
                <div className="w-6 mr-3">
                    {type === 'directory' ? <Folder size={18} className="text-blue-500 fill-blue-500/20" /> :
                        type === 'image' ? <ImageIcon size={18} className="text-purple-500" /> : <FileText size={18} className="text-gray-500" />}
                </div>
                <span className="flex-1 truncate group-hover:text-blue-600 font-medium">{name}</span>
                <span className="text-xs text-gray-400 w-24">{type === 'directory' ? '--' : '4 KB'}</span>
            </div>
        );
    }
    return (
        <div onDoubleClick={onDoubleClick} className="flex flex-col items-center p-3 hover:bg-[#e7e7e9] rounded-lg cursor-pointer transition-colors group border border-transparent hover:border-[#d4d4d4]">
            <div className="w-16 h-16 flex items-center justify-center mb-2 transition-transform group-hover:scale-105">
                {type === 'directory' ? (
                    <Folder className="w-full h-full text-[#007aff] fill-[#007aff]/10" strokeWidth={1} />
                ) : type === 'image' ? (
                    <div className="w-14 h-14 bg-white border border-gray-200 shadow-sm flex items-center justify-center rounded overflow-hidden p-1">
                        <img src={item.content} className="w-full h-full object-cover rounded-sm" />
                    </div>
                ) : (
                    <div className="w-12 h-14 bg-white border border-gray-200 shadow-sm flex items-center justify-center rounded relative">
                        <div className="absolute top-0 right-0 w-3 h-3 bg-gray-100" style={{ clipPath: 'polygon(100% 0, 0 100%, 100% 100%)' }}></div>
                        <FileText className="text-gray-400" size={28} />
                    </div>
                )}
            </div>
            <span className="text-xs text-center break-all px-1.5 py-0.5 rounded group-hover:bg-[#007aff] group-hover:text-white line-clamp-2 transition-colors font-medium text-gray-700">{name}</span>
        </div>
    );
};

export default FileManager;
