import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

// item en carrito: { id, title, price, pictureUrl, qty, subtotal }
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addItem = (item, qty) => {
    const n = Number(qty);

    if (!item?.id) return;
    if (!Number.isFinite(n) || n <= 0) return;

    const stock = Number(item.stock ?? 0);
    if (Number.isFinite(stock) && stock > 0 && n > stock) return;

    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);

      // si ya existe, sumamos y respetamos stock
      if (existing) {
        const newQty = existing.qty + n;
        const finalQty =
          Number.isFinite(stock) && stock > 0 ? Math.min(newQty, stock) : newQty;

        return prev.map((p) =>
          p.id === item.id
            ? { ...p, qty: finalQty, subtotal: finalQty * p.price }
            : p
        );
      }

      // si no existe, lo agregamos
      const safeQty =
        Number.isFinite(stock) && stock > 0 ? Math.min(n, stock) : n;

      const price = Number(item.price ?? 0);

      return [
        ...prev,
        {
          id: item.id,
          title: item.title ?? "Producto",
          price,
          pictureUrl: item.pictureUrl ?? "",
          qty: safeQty,
          subtotal: safeQty * price,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const totalItems = useMemo(
    () => cart.reduce((acc, p) => acc + p.qty, 0),
    [cart]
  );

  const totalPrice = useMemo(
    () => cart.reduce((acc, p) => acc + p.subtotal, 0),
    [cart]
  );

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [cart, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
