import { createRoot } from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root')!;

// Ensure we only create the root once
if (!rootElement.dataset.reactRoot) {
  const root = createRoot(rootElement);
  rootElement.dataset.reactRoot = 'true';
  root.render(<App />);
}
