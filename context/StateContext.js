import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();
export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [quantities, setQuantities] = useState([]);
  let foundProduct;
  let index;
  const onAdd = (product, quantity) => {
    index = cartItems.findIndex((item) => item._id === product._id);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (index > -1) {
      const updatedQuantities = quantities;
      updatedQuantities[index] += quantity;
      setQuantities(updatedQuantities);
    } else {
      setQuantities([...quantities, quantity]);
      setCartItems([...cartItems, product]);
    }
    toast.success(`${qty} ${product.name} added to the cart.`);
  };
  const onRemove = (product) => {
    index = cartItems.findIndex((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - cartItems[index].price * quantities[index]
    );
    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - quantities[index]
    );
    setCartItems(newCartItems);

    const updatedQuantities = quantities;
    setQuantities([
      ...updatedQuantities.slice(0, index),
      ...updatedQuantities.slice(index + 1, quantities.length),
    ]);
  };
  const toggleCartItemQuanitity = (id, value) => {
    index = cartItems.findIndex((product) => product._id == id);
    const newQuantities = quantities;
    if (value == "inc") {
      newQuantities[index] += 1;
      setQuantities(newQuantities);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + cartItems[index].price
      );
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value == "dec") {
      if (quantities[index] > 1) {
        newQuantities[index] -= 1;
        setQuantities(newQuantities);
        setTotalPrice(
          (prevTotalPrice) => prevTotalPrice - cartItems[index].price
        );
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };
  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        toggleCartItemQuanitity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        quantities,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);
