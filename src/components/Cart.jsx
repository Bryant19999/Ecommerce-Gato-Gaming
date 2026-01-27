import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const Cart = () => {
  const { cart, clearCart, totalItems, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Carrito</h1>
        <p className="mt-3 text-slate-300">Tu carrito está vacío.</p>

        <Link
          to="/"
          className="inline-flex mt-6 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors"
        >
          Ir al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-3xl font-semibold">Carrito</h1>

        <button
          onClick={clearCart}
          className="rounded-xl border border-slate-700/50 px-4 py-2 text-sm font-semibold hover:border-slate-500/60 transition-colors"
        >
          Vaciar carrito
        </button>
      </div>

      <div className="mt-8 grid gap-4">
        {cart.map((p) => (
          <CartItem key={p.id} item={p} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5 flex flex-col gap-3">
        <div className="flex items-center justify-between text-sm text-slate-300">
          <span>Total unidades</span>
          <span className="text-slate-100 font-semibold">{totalItems}</span>
        </div>

        <div className="flex items-center justify-between text-base">
          <span className="text-slate-300">Total</span>
          <span className="text-slate-100 font-semibold text-xl">
            ${Number(totalPrice ?? 0).toLocaleString("es-CO")}
          </span>
        </div>

        <div className="mt-3 flex gap-3 flex-wrap">
          <Link
            to="/"
            className="rounded-xl border border-slate-700/50 px-4 py-2 text-sm font-semibold hover:border-slate-500/60 transition-colors"
          >
            Seguir comprando
          </Link>

          <Link
            to="/checkout"
            className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors"
          >
            Ir a checkout
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Cart;
