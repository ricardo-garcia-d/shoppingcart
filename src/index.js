import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.css'



// Remove the unused CartContext import to avoid confusion
import { CartProvider } from './context/Context'; // Correct import

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Use CartProvider here */}
      <App />
    </CartProvider>
  </React.StrictMode>
);


reportWebVitals();
