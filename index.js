import { render } from './rekt-dom.js';
import App from './App.js';

// container can also be document.body but this is best practice
render(App, document.getElementById('app-root'));