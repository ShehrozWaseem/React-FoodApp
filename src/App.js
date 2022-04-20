import React, {useState} from 'react'

import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from './store/CartProvider';

function App() {
  const [showCart,CartHandler] = useState(false);

  const showCartHandler = () =>{
    CartHandler(true);
  }

  const hideCartHandler = () =>{
    CartHandler(false);
  }
  return (
      <CartProvider>
      {showCart && <Cart onhideCartHandler={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
      <Meals/>
      </CartProvider>
  );
}

export default App;
