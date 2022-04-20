import React from "react"

const CartContext = React.createContext({
    items:[],
    amt:0,
    addItems: () =>{},
    removeItems: ()=>{},
    clearCart: ()=>{}
})
export default CartContext