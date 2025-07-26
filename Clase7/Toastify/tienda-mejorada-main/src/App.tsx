import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDisplay from './components/ProductDisplay';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Header from './components/Header';
import GlobalStyles from './GlobalStyles';
import CrearProducto from './components/CrearProducto';
import Login from './components/Login';
import Admin from './components/Admin';

const App: React.FC = () => {
  return (
    <div className="App">
      <GlobalStyles />
      <Header />
      <main style={{ paddingTop: '60px' }}>
        <Routes>
          <Route path="/" element={<ProductDisplay />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/product/crear" element={<CrearProducto />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;

