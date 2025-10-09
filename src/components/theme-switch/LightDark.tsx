"use client";


import { useTheme } from '@/lib/theme-switch/LightDark';
import { useEffect, useState } from 'react';

export default function LightDark() {
       const [theme, setTheme] = useTheme();
       const [mounted, setMounted] = useState(false);

       useEffect(() => {
	       setMounted(true);
       }, []);

       if (!mounted) return null;

       const handleToggle = () => {
	       setTheme(theme === 'light' ? 'dark' : 'light');
       };

       return (
	       <button
		       aria-label="Toggle theme"
		       onClick={handleToggle}
		       style={{
			       background: 'none',
			       border: 'none',
			       borderRadius: '50%',
			       width: 48,
			       height: 48,
			       display: 'flex',
			       alignItems: 'center',
			       justifyContent: 'center',
			       cursor: 'pointer',
			       boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
			       transition: 'background 0.2s',
		       }}
	       >
		       {theme === 'light' ? (
			       // Matahari (Sun)
			       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				       <circle cx="16" cy="16" r="8" fill="#FFD600" />
				       <g stroke="#FFD600" strokeWidth="2">
					       <line x1="16" y1="2" x2="16" y2="7" />
					       <line x1="16" y1="25" x2="16" y2="30" />
					       <line x1="2" y1="16" x2="7" y2="16" />
					       <line x1="25" y1="16" x2="30" y2="16" />
					       <line x1="6.22" y1="6.22" x2="9.76" y2="9.76" />
					       <line x1="22.24" y1="22.24" x2="25.78" y2="25.78" />
					       <line x1="6.22" y1="25.78" x2="9.76" y2="22.24" />
					       <line x1="22.24" y1="9.76" x2="25.78" y2="6.22" />
				       </g>
			       </svg>
		       ) : (
			       // Bulan (Moon)
			       <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
				       <circle cx="16" cy="16" r="12" fill="#22223B" />
				       <path d="M22 16c0 3.31-2.69 6-6 6a6 6 0 0 1 0-12c.34 0 .67.03 1 .08A8 8 0 1 0 22 16z" fill="#F2E9E4" />
			       </svg>
		       )}
	       </button>
       );
}
