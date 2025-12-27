import logoGold from '../assets/logo-gold.png';
import logoPurple from '../assets/logo-purple.png';
import logoRed from '../assets/logo-red.png';
import resumePdf from '../assets/tamizh_resume.pdf';

export const fileSystem = {
    "Macintosh HD": {
        type: "directory",
        children: {
            "Users": {
                type: "directory",
                children: {
                    "Tamizh": {
                        type: "directory",
                        children: {
                            "Projects": {
                                type: "directory",
                                children: {
                                    "neon-genesis-portfolio.md": { type: "file", content: "# Neon Genesis Portfolio\n\nA futuristic, cyber-security themed portfolio OS built with React and Tailwind CSS." },
                                    "secure-chat-e2e.md": { type: "file", content: "# SecureChat E2E\n\nEnd-to-end encrypted messaging platform ensuring total privacy." },
                                    "vuln-scanner-pro.py": { type: "file", content: "# VulnScanner Pro\n\nAutomated vulnerability scanner for web applications." }
                                }
                            },
                            "Documents": {
                                type: "directory",
                                children: {
                                    "resume.pdf": { type: "pdf", content: resumePdf },
                                    "project_ideas.txt": { type: "file", content: "1. AI Voice Assistant\n2. Decentralized Social Network" }
                                }
                            },
                            "Downloads": {
                                type: "directory",
                                children: {}
                            },
                            "skills_and_tools.txt": {
                                type: "file",
                                content: "Click to view Skills & Experience app."
                            },
                            "about_me.md": {
                                type: "file",
                                content: "Click to open About Me."
                            },
                            "contact_info.json": {
                                type: "file",
                                content: "{\n  \"name\": \"Tamizharuvi P\",\n  \"email\": \"aruvi2908@gmail.com\",\n  \"phone\": \"+91 6381353913\",\n  \"linkedin\": \"linkedin.com/in/tamizharuvi-p-946663287\",\n  \"github\": \"github.com/Tamizharuvi2006\",\n  \"location\": \"Chennai, India\"\n}"
                            }
                        }
                    },
                    "Guest": {
                        type: "directory",
                        children: {}
                    }
                }
            },
            "System": {
                type: "directory",
                children: {
                    "Applications": { type: "directory", children: {} },
                    "Library": { type: "directory", children: {} }
                }
            }
        }
    },
    "Cloud": {
        type: "directory",
        children: {
            "Photos": {
                type: "directory",
                children: {
                    "logo-gold.png": { type: "image", content: logoGold },
                    "logo-purple.png": { type: "image", content: logoPurple },
                    "logo-red.png": { type: "image", content: logoRed }
                }
            },
            "Drive": { type: "directory", children: {} }
        }
    }
};
