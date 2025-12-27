import React, { useState } from 'react';
import Desktop from './Desktop';
import Dock from './Dock';
import StartMenu from './StartMenu';
import MenuBar from './MenuBar';
import { useOS } from '../os/OSContext';
import Window from '../os/Window';
import Terminal from '../../apps/Terminal';
import FileManager from '../../apps/FileManager';
import WelcomeScreen from '../../apps/WelcomeScreen';
import SocialHub from '../../apps/SocialHub';
import Projects from '../../apps/Projects';
import Skills from '../../apps/Skills';
import Contact from '../../apps/Contact';
import Browser from '../../apps/Browser';
import DesktopIcon from '../os/DesktopIcon';
import { fileSystem } from '../../apps/filesystem';



// Start Menu Components

const KaliDesktop = () => {
    const { windows, openWindow, activeWindowId } = useOS();
    const [startMenuOpen, setStartMenuOpen] = useState(false);



    const handleOpenApp = React.useCallback((appId) => {
        if (appId === 'apps') {
            setStartMenuOpen(prev => !prev);
            return;
        }

        let title = 'Application';
        let component = null;

        switch (appId) {
            case 'terminal':
                title = 'Terminal Emulator';
                component = <Terminal />;
                break;
            case 'files':
                title = 'File Manager - /home/tamizh';
                component = <FileManager onNavigate={handleOpenApp} />;
                break;
            case 'socials':
                title = 'Connect with Tamizh';
                component = <SocialHub />;
                break;
            case 'projects':
                title = 'My Projects';
                component = <Projects />;
                break;
            case 'skills':
                title = 'Skills & Experience';
                component = <Skills />;
                break;
            case 'contact':
                title = 'Contact Me';
                component = <Contact />;
                break;
            case 'browser':
                title = 'Tamizh - Web Browser';
                component = <Browser onNavigate={handleOpenApp} />;
                break;
            case 'readme':
                title = 'Welcome to Tamizh OS';
                component = <WelcomeScreen />;
                break;
            case 'resume':
                title = 'Resume - Tamizharuvi';
                component = (
                    <div className="w-full h-full bg-gray-900">
                        <iframe
                            src={fileSystem['Macintosh HD'].children.Users.children.Tamizh.children.Documents.children['resume.pdf'].content}
                            className="w-full h-full border-none"
                            title="Resume PDF"
                        />
                    </div>
                );
                break;
            default:
                title = appId;
                component = <div className="p-4">App ID: {appId}</div>;
        }

        openWindow(appId, component, title);
        setStartMenuOpen(false);
    }, [openWindow]);

    // Auto-open welcome screen
    const welcomeShown = React.useRef(false);
    React.useEffect(() => {
        if (!welcomeShown.current) {
            const timer = setTimeout(() => {
                handleOpenApp('readme');
                welcomeShown.current = true;
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [handleOpenApp]);



    return (
        <Desktop>
            <MenuBar onOpenApp={handleOpenApp} />
            <div className="flex-1 relative p-4 pt-24 flex flex-col flex-wrap content-start h-full pb-24">
                {/* Desktop Icons */}
                <DesktopIcon label="Terminal" iconInfo="terminal" onClick={() => handleOpenApp('terminal')} />
                <DesktopIcon label="Projects" iconInfo="folder" onClick={() => handleOpenApp('projects')} />
                <DesktopIcon label="Skills" iconInfo="file-text" onClick={() => handleOpenApp('skills')} />
                <DesktopIcon label="Contact" iconInfo="mail" onClick={() => handleOpenApp('contact')} />
                <DesktopIcon label="Resume" iconInfo="file-text" onClick={() => handleOpenApp('resume')} />

                {/* Render Windows */}
                {windows.map(win => (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        zIndex={win.zIndex}
                        isActive={activeWindowId === win.id}
                        isMinimized={win.minimized}
                    >
                        {win.component}
                    </Window>
                ))}

                <StartMenu
                    isOpen={startMenuOpen}
                    onClose={() => setStartMenuOpen(false)}
                    onOpenApp={handleOpenApp}
                />
            </div>
            <Dock onOpenApp={handleOpenApp} />
        </Desktop>
    );
};

export default KaliDesktop;
