import { ThemeProvider, ThemeContext } from './theme';
import AppRouter from "./pages/routes";
import { useContext } from 'react';

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

const AppContent = () => {
  const { theme, toggle } = useContext(ThemeContext);
  return (
    <div className="app-container">
      <header style={{display:'flex', justifyContent:'flex-end', padding:'1rem'}}>
        <button onClick={toggle} aria-label="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </header>
      <AppRouter />
    </div>
  );
};

export default App;
