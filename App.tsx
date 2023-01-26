import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from './src/contexts/ThemeContext';
import Home from './src/modules/Home';

export default function App() {
  return (
    <ThemeProvider>
        <StatusBar style="light" />
        <Home/>
    </ThemeProvider>
  );
}
