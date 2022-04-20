import React , {useReducer} from 'react'
import CartContext from './cart-context'



const defaultCartState = {
    items:[],
    total_amt:0
}
const cartReducer = (state,action)=>{
    if(action.type==='ADD'){
        // const updatedItems = state.items.concat(action.item)
        // const updatedAmt = state.total_amt + action.item.price * action.item.amt
        // return{
        //     items: updatedItems,
        //     total_amt: updatedAmt
        // }
        const updatedState = { ...state };
 
        const itemIndex = updatedState.items.findIndex(
          (item) => item.id === action.item.id
        );
        console.log(itemIndex)
     
        if (itemIndex >= 0) {
          updatedState.items[itemIndex].amt += action.item.amt;
        } else {
          updatedState.items.push(action.item);
        }
     
        updatedState.total_amt += action.item.amt * action.item.price;
     
        return updatedState;
      
    }

    if (action.type === 'REMOVE') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
      const updatedTotalAmount = state.total_amt - existingItem.price;
      let updatedItems;
      if (existingItem.amt === 1) {
        updatedItems = state.items.filter(item => item.id !== action.id);
      } else {
        const updatedItem = { ...existingItem, amt: existingItem.amt - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } 
      return{
        items:updatedItems,
        total_amt:updatedTotalAmount
      }
    }
  
    if(action.type==="CLEAR"){
      return  {
        items:[],
        total_amt:0
    }
    }
    return defaultCartState
}


function CartProvider(props) {


    const [cartState,dispatchCartAciton] = useReducer(cartReducer,defaultCartState)

    const addItemtoHandler = (item) =>{
        dispatchCartAciton({type:"ADD",item:item})
    }
    const removeItemHandler = (id) =>{
        dispatchCartAciton({type:"REMOVE",id:id})
    }
    const clearCartHanlder = () =>{
      dispatchCartAciton({type:"CLEAR"})
    }


    const cartContext = {
        items:cartState.items,
        amt:cartState.total_amt,
        addItem: addItemtoHandler,
        removeItem: removeItemHandler,   
        clearCart: clearCartHanlder 
    }

  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider