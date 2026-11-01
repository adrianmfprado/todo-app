import { createContext, useState, useEffect, useCallback } from 'react';

export const THEME_STORAGE_KEY = 'theme';

export const ThemeContext = createContext();

const getInitialTheme = () => {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') return stored;
	} catch {
		// localStorage indisponível — segue para o fallback de sistema
	}
	try {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			return 'dark';
		}
	} catch {
		// matchMedia indisponível — usa default claro
	}
	return 'light';
};

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState(getInitialTheme);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	useEffect(() => {
 try {
 localStorage.setItem(THEME_STORAGE_KEY, theme);
 } catch {
 // storage inacessível — ignora silenciosamente
 }	}, [theme]);	const toggle = useCallback(() => { setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')); }, []); return ( <ThemeContext.Provider value={{ theme, toggle }}> {children} </ThemeContext.Provider> );};