const CartWidget = () => {
  const itemsInCart = 3;

  return (
    <button
      className="relative inline-flex items-center justify-center text-2xl"
      aria-label="Carrito de compras"
    >
      <span>🛒</span>
      <span
        className="absolute -top-1 -right-2
          px-1.5 text-[10px] font-semibold
          rounded-full
          bg-emerald-500 text-slate-900
          border border-slate-900"
      >
        {itemsInCart}
      </span>
    </button>
  );
};

export default CartWidget;