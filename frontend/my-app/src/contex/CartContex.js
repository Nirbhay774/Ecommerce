import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();
const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([]
   );

   useEffect(()=>{
    const  data = localStorage.getItem('cart')
    if(data){
        setCart(JSON.parse(data))
    }

   },[])

   console.log("my cart" ,Cart)



  return (
    <CartContext.Provider value={[Cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };