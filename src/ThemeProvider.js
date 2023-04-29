import { light, dark } from 'styles/theme';
import { createContext, useState, useContext, useCallback } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

const ThemeContext = createContext({});

const ThemeProvider = ({ children }) => {

    const LocalStorage = window.localStorage.getItem('theme') || 'dark';
    const [themeMode, setThemeMode] = useState(LocalStorage);
    const themeObject = themeMode === 'dark' ? dark : light;

    return (
        <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
            <StyledProvider theme={themeObject}>{children}</StyledProvider>
        </ThemeContext.Provider>
    );
};

function useTheme() {
    const context = useContext(ThemeContext);
    const { themeMode, setThemeMode } = context;

    const toggleTheme = useCallback(() => {
        if (themeMode === "light") {
            setThemeMode("dark");
            window.localStorage.setItem('theme', 'dark');
        }
        else {
            setThemeMode("light")
            window.localStorage.setItem('theme', 'light');
        };
    }, [themeMode]);

    return [themeMode, toggleTheme];
}

export { ThemeProvider, useTheme };
