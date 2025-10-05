"use client";

import { useState, useEffect } from 'react';
export type Theme = 'light' | 'dark';

export function useTheme(): [Theme, (theme: Theme) => void] {
	const [theme, setTheme] = useState<Theme>(() => {
		if (typeof window !== 'undefined') {
			return (localStorage.getItem('theme') as Theme) || 'light';
		}
		return 'light';
	});


	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		// Sinkronkan juga data-color-scheme agar CSS variable berubah
		if (theme === 'light') {
			document.documentElement.setAttribute('data-color-scheme', 'default');
		} else {
			document.documentElement.setAttribute('data-color-scheme', 'default-dark');
		}
		localStorage.setItem('theme', theme);
	}, [theme]);

	return [theme, setTheme];
}
