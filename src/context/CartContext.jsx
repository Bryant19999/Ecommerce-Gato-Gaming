import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [totalItems, setTotalItems] = useState(0);

  const addItem = (qty) => {
    const n = Number(qty);
    if (!Number.isFinite(n) || n <= 0) return;
    setTotalItems((prev) => prev + n);
  };

  const value = useMemo(() => ({ totalItems, addItem }), [totalItems]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};