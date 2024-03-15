import { HashRouter, Routes, Route } from 'react-router-dom'; // Import Routes
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Cart from './components/Cart';
import './styles/styles.css';

function App() {
  return (
    <HashRouter>
      <Header />
      <div>
        <Routes> {/* Wrap Route components inside Routes */}
          <Route path='/' element={<Home/>} />
          <Route path='/cart' element={<Cart/>} />
        </Routes>
      </div>
    </HashRouter>
  );
}

export default App;
