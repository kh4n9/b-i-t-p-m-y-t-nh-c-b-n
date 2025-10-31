import React from 'react';

// Using a simple object for icons to avoid extra dependencies.
// FIX: Replaced JSX.Element with React.ReactElement to resolve "Cannot find namespace 'JSX'" error.
const ICONS: Record<string, React.ReactElement> = {
    'folder-plus': <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0v6m0-6h6m-6 0H6" />,
    'folder-minus': <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />,
    'file-edit': <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    'word': <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0v6m0-6h6m-6 0H6" />, // Placeholder
    'excel': <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0v6m0-6h6m-6 0H6" />, // Placeholder
    'powerpoint': <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0v6m0-6h6m-6 0H6" />, // Placeholder
    'zip': <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm4 2v2m0 4v2m0-4h4" />,
    'unzip': <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    'shortcut': <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
    'search': <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    'image-search': <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    'download': <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    'computer': <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    'language': <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.06 7.94a10.02 10.02 0 01-2.12 0m2.12a10.02 10.02 0 00-2.12 0m-2.12 2.12a10.02 10.02 0 012.12 0m-2.12 2.12a10.02 10.02 0 002.12 0M3 10.5h12m-12 4.5h12M15 21l3-3m0 0l-3-3m3 3H3" />,
    'arrow-left': <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />,
    'arrow-right': <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />,
    'default': <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
};

interface IconProps {
  name: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = 'w-6 h-6' }) => {
    const icon = ICONS[name] || ICONS['default'];
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            {icon}
        </svg>
    );
};
