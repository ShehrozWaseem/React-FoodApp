import React ,{useContext} from 'react'
import classes from './HeaderCartButton.module.css'
import CartIcon from '../Cart/CartIcon'
import CartContext from '../../store/cart-context'


function HeaderCartButton(props) {
  const cartCtx = useContext(CartContext)

  const noOfCartItems = cartCtx.items.reduce((curNumb,item)=>{
    return curNumb+item.amt;
  },0)
  return (
    <button className={classes.button} onClick={props.onShowCart}>
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{noOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton