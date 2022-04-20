import React, { useContext,useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

function Cart(props) {
  const [isCheckout,setIsCheckout]=useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const itemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  };
  const itemAddHandler = (item) => {
    const cartItem = { ...item, amt: 1 };
    cartCtx.addItem(cartItem);
  };
  const checkoutHandler=()=>{
    setIsCheckout(true)
  }

  const total_amt = `$${cartCtx.amt.toFixed(2)}`;

  const submitOrderHandler = (userData) =>{
    setIsSubmitting(true);
    fetch("https://react-d2186-default-rtdb.firebaseio.com/orders.json",{
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderData: cartCtx.items

      })

    })
    setIsSubmitting(false)
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const cart_items = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => 
        <CartItem
          key={item.id}
          name={item.name}
          price={item.price}
          amt={item.amt}
          onRemove={itemRemoveHandler.bind(null,item.id)}
          onAdd={itemAddHandler.bind(null,item)}
        />
        // <li>{item.name}</li>
      )}
    </ul>
  );
  const cart_checkout = <React.Fragment>
    {cart_items}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{total_amt}</span>
      </div>
      {!isCheckout && <div className={classes.actions}>
        <button
          className={classes["button--alt"]}
          onClick={props.onhideCartHandler}
        >
          Close
        </button>
        {cartCtx.items.length > 0 && (
          <button className={classes.button} onClick={checkoutHandler}>Order</button>
        )}
      </div>}
      {isCheckout &&<Checkout onConfirm={submitOrderHandler} onCancel={props.onhideCartHandler}/>}
  </React.Fragment>

  const isSubmittingModalContent = <p>Sending order data...</p>;

  const didSubmitModalContent = (
    <React.Fragment>
      <p>Successfully sent the order!</p>
      <div className={classes.actions}>
      <button className={classes.button} onClick={props.onhideCartHandler}>
        Close
      </button>
    </div>
    </React.Fragment>
  );
  return (


    <Modal onhideCartHandler={props.onhideCartHandler}>
      {!isSubmitting && !didSubmit && cart_checkout} 
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
}

export default Cart;
