import React, { useState, useEffect, useRef } from 'react';
import { fileSystem } from './filesystem';

const Terminal = () => {
    const [history, setHistory] = useState([
        { type: 'output', content: 'Kali GNU/Linux Rolling [Version 2025.1]\n(c) 2025 Kali Linux. All rights reserved.\n\nType "help" for a list of commands.' }
    ]);
    const [input, setInput] = useState('');
    const [currentPath, setCurrentPath] = useState(['home', 'tamizh']);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // Auto-focus input
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const getDir = (pathArray) => {
        let current = fileSystem;
        for (const dir of pathArray) {
            if (current[dir]) {
                current = current[dir];
            } else if (current.children && current.children[dir]) { // Handle potential structure differences
                current = current.children[dir];
            } else {
                return null;
            }
        }
        return current;
    };

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const trimmedCmd = input.trim();
            const newHistory = [...history, { type: 'input', content: input, path: `~${currentPath.slice(2).length > 0 ? '/' + currentPath.slice(2).join('/') : ''}` }];

            if (trimmedCmd) {
                const parts = trimmedCmd.split(' ');
                const cmd = parts[0];
                const args = parts.slice(1);

                let output = '';

                switch (cmd) {
                    case 'help':
                        output = `\u001b[1;34mAvailable Commands:\u001b[0m

1. whoami   - View current user identity
2. skills   - List technical skills & expertise
3. about    - Learn more about Tamizharuvi
4. ls       - List files and directories
5. clear    - Clear the terminal screen`;
                        break;
                    case 'clear':
                        setHistory([]);
                        setInput('');
                        return; // Special case
                    case 'whoami':
                        output = 'Tamizharuvi';
                        break;
                    case 'skills':
                        output = `\u001b[1;34mLanguages:\u001b[0m JavaScript (ES6+), Python, HTML5, CSS3
\u001b[1;34mFrontend:\u001b[0m React, Tailwind CSS, Framer Motion, Next.js
\u001b[1;34mBackend:\u001b[0m Node.js, Express, Django
\u001b[1;34mTools:\u001b[0m Git, Linux, Docker, VS Code`;
                        break;
                    case 'about':
                        output = `Hi, I'm \u001b[1;34mTamizharuvi\u001b[0m!
I'm a passionate Full Stack Developer who loves building interactive and beautiful web experiences.
I enjoy solving complex problems and turning ideas into reality through code.`;
                        break;
                    case 'date':
                        output = new Date().toString();
                        break;
                    case 'echo':
                        output = args.join(' ');
                        break;
                    case 'ls': {
                        const dir = getDir(currentPath);
                        if (dir) {
                            output = Object.keys(dir).filter(k => k !== 'type' && k !== 'content').map(k => {
                                const item = dir[k];
                                return item.type === 'file' ? k : `\u001b[1;34m${k}/\u001b[0m`; // Color coding hack
                            }).join('  ');
                        } else {
                            output = 'Error: Cannot read directory.';
                        }
                        break;
                    }
                    case 'cd':
                        if (!args[0] || args[0] === '~') {
                            setCurrentPath(['home', 'kali']);
                        } else if (args[0] === '..') {
                            if (currentPath.length > 2) { // Don't go above home/kali for safety in this demo
                                setCurrentPath(prev => prev.slice(0, -1));
                            }
                        } else {
                            const target = args[0];
                            const currentDir = getDir(currentPath);
                            if (currentDir && currentDir[target] && typeof currentDir[target] === 'object' && currentDir[target].type !== 'file') {
                                setCurrentPath(prev => [...prev, target]);
                            } else {
                                output = `bash: cd: ${target}: No such file or directory`;
                            }
                        }
                        break;
                    case 'cat':
                        if (!args[0]) {
                            output = 'cat: missing operand';
                        } else {
                            const targetFile = args[0];
                            const currentDir = getDir(currentPath);
                            if (currentDir && currentDir[targetFile]) {
                                if (currentDir[targetFile].type === 'file') {
                                    output = currentDir[targetFile].content;
                                } else {
                                    output = `cat: ${targetFile}: Is a directory`;
                                }
                            } else {
                                output = `cat: ${targetFile}: No such file or directory`;
                            }
                        }
                        break;
                    default:
                        output = `bash: ${cmd}: command not found`;
                }

                if (output) {
                    newHistory.push({ type: 'output', content: output });
                }
            }

            setHistory(newHistory);
            setInput('');
        }
    };

    return (
        <div
            className="h-full w-full bg-[#101010]/95 text-gray-300 font-mono text-sm p-2 overflow-y-auto"
            onClick={() => inputRef.current?.focus()}
        >
            {history.map((line, i) => (
                <div key={i} className="mb-1 whitespace-pre-wrap break-words">
                    {line.type === 'input' ? (
                        <div>
                            <div className="text-accent-red font-bold">
                                ┌──(tamizh㉿portfolio)-[{line.path.replace('kali', 'tamizh')}]
                            </div>
                            <div className="flex">
                                <span className="text-accent-red font-bold mr-2">└─$</span>
                                <span className="text-white">{line.content}</span>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* eslint-disable-next-line no-control-regex */}
                            <div dangerouslySetInnerHTML={{ __html: line.content.replace(/\n/g, '<br/>').replace(/\u001b\[1;34m/g, '<span class="text-blue-400 font-bold">').replace(/\u001b\[0m/g, '</span>') }}></div>
                        </>
                    )}
                </div>
            ))
            }

            <div className="mt-1">
                <div className="text-accent-red font-bold">
                    ┌──(tamizh㉿portfolio)-[~{currentPath.slice(2).length > 0 ? '/' + currentPath.slice(2).join('/') : ''}]
                </div>
                <div className="flex items-center">
                    <span className="text-accent-red font-bold mr-2">└─$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleCommand}
                        className="flex-1 bg-transparent border-none outline-none text-white p-0 m-0"
                        autoComplete="off"
                        autoFocus
                    />
                </div>
            </div>
            <div ref={bottomRef}></div>
        </div >
    );
};

export default Terminal;
