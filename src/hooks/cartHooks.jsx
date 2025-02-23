import { useEffect, useState } from "react";

export default function useCart(){

const [cart, setCart] = useState(localStorage.cartMeds?JSON.parse(localStorage.cartMeds):[]);
  const [cartOpen, setCartOpen] = useState(false);
  async function addToCart(med) {
    console.log(med);
    console.log("med");
    if(isEmpty(med)) return;
    let positionInCart = cart.findIndex(value => value.med_id == med.med_id);
    console.log(positionInCart);
    
    if (positionInCart === -1) {
      setCart(val => [
        ...val,
        { ...med, qty: 1 }
      ]);
    } else {
      let newItem = { ...cart[positionInCart] };
      newItem.qty += 1;
      
      setCart(val => {
        const newCart = val.filter(detail => detail.med_id != med.med_id);
        newCart.splice(positionInCart, 0, newItem);
        return newCart;
      });
    }
  }
  
//   async  function addToCart(med,med_id) {
//     let positionInCart = cart.findIndex((value) => value.med_id == med_id);
//     console.log(positionInCart)
//     if (positionInCart === -1) {
//       setCart((val) => [
//         ...val,
//         { ...med, qty: 1 },
//       ]);
//     } else {
//       let newItem = cart[positionInCart];
//       setCart(val => val.filter(detail=>detail.med_id != med_id));
//       console.log(cart)
//       newItem.qty = newItem.qty + 1;
//       let newArray = cart ;
//       newArray.splice(positionInCart, 0, newItem);
//       setCart(newArray);
//     }
//   }

  function removeFromCart(med_id) {
    console.log(med_id);
    setCart(val => val.filter(detail=>detail.med_id != med_id));
  }

  function addQTYCart(med_id) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.med_id === med_id);
      if (itemIndex !== -1) {
        newCart[itemIndex] = { ...newCart[itemIndex], qty: newCart[itemIndex].qty + 1 };
      }
      return newCart;
    });
  }

  function minusQTYCart(med_id) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.med_id === med_id);
      if (itemIndex !== -1) {
        if (newCart[itemIndex].qty > 1) {
          newCart[itemIndex] = { ...newCart[itemIndex], qty: newCart[itemIndex].qty - 1 };
        } else {
          // Remove the item if the quantity is 1 and the user wants to reduce it
          newCart.splice(itemIndex, 1);
        }
      }
      return newCart;
    });
  }

  function changeQtyNum(med_id, qty) {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      const itemIndex = newCart.findIndex(item => item.med_id === med_id);
      if (itemIndex !== -1) {
        newCart[itemIndex] = { ...newCart[itemIndex], qty: qty };
      }
      return newCart;
    });
  }
    useEffect(() => {
    localStorage.cartMeds=JSON.stringify(cart),[cart]})


    function isEmpty(obj) {
      for (const prop in obj) {
        if (Object.hasOwn(obj, prop)) {
          return false;
        }
      }
    
      return true;
    }
return{
    cart,
    cartOpen,
    setCartOpen,
    addToCart,
    removeFromCart,
    addQTYCart,
    minusQTYCart,
    changeQtyNum,
  };

};