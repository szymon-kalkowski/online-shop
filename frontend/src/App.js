import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import Shop from './pages/Shop.js';
import Cart from './pages/Cart.js';
import Favorite from './pages/Favorite';
import OrderComplete from './pages/OrderComplete.js'
import Navbar from './components/Navbar.js';
import Product from './pages/Product.js';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import Contact from './pages/Contact';
import Personalization from './pages/Personalization';

function App() {
  const cartFromLocalStorage = JSON.parse(localStorage.getItem("cart") || '[]');
  const favoriteFromLocalStorage = JSON.parse(localStorage.getItem("favorite") || '[]');

  const [cart, setCart] = React.useState(cartFromLocalStorage);
  const [favorite, setFavorite] = React.useState(favoriteFromLocalStorage);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  React.useEffect(() => {
    localStorage.setItem("favorite", JSON.stringify(favorite));
  }, [favorite]);

  return (
    <>
      <Navbar cart={cart} favorite={favorite} />
      <div className="container-fluid p-0 mb-5">
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="sklep" element={<Shop />} />
          <Route path="sklep/:slug" element={<Product setCart={(x) => setCart(x)} favorite={favorite} setFavorite={(x) => setFavorite(x)}/>} />
          <Route path="koszyk" element={<Cart cart={cart} setCart={(x) => setCart(x)} />} />
          <Route path="podsumowanie" element={<Checkout cart={cart} setCart={(x) => setCart(x)} />} />
          <Route path="dziekujemy" element={<OrderComplete />} />
          <Route path="ulubione" element={<Favorite favorite={favorite} setFavorite={(x) => setFavorite(x)} />} />
          <Route path="kontakt" element={<Contact />} />
          <Route path="personalizacja" element={<Personalization />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
