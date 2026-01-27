import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { createOrderFS } from "../services/firestore";

const CheckoutForm = () => {
  const { cart, totalItems, totalPrice, clearCart } = useCart();

  const [buyer, setBuyer] = useState({
    name: "",
    phone: "",
    email: "",
    emailConfirm: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [orderId, setOrderId] = useState("");

  const canSubmit = useMemo(() => {
    if (cart.length === 0) return false;
    if (!buyer.name.trim()) return false;
    if (!buyer.phone.trim()) return false;
    if (!buyer.email.trim()) return false;
    if (buyer.email.trim() !== buyer.emailConfirm.trim()) return false;
    return true;
  }, [buyer, cart.length]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setBuyer((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setOrderId("");

    if (cart.length === 0) {
      setErrorMsg("Tu carrito está vacío.");
      return;
    }

    if (buyer.email.trim() !== buyer.emailConfirm.trim()) {
      setErrorMsg("Los correos no coinciden.");
      return;
    }

    try {
      setSubmitting(true);

      const order = {
        buyer: {
          name: buyer.name.trim(),
          phone: buyer.phone.trim(),
          email: buyer.email.trim(),
        },
        items: cart.map((p) => ({
          id: p.id,
          title: p.title,
          price: p.price,
          qty: p.qty,
          subtotal: p.subtotal,
        })),
        totalItems,
        totalPrice,
      };

      const id = await createOrderFS(order);
      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error("Error creando orden:", err);
      setErrorMsg("No se pudo generar la orden. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ UX: carrito vacío
  if (cart.length === 0 && !orderId) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">Checkout</h1>
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

  // orden creada + mostrar ID
  if (orderId) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl font-semibold">¡Compra confirmada! ✅</h1>
        <p className="mt-3 text-slate-300">
          Tu orden fue generada correctamente.
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-slate-900/40 p-5">
          <p className="text-sm text-slate-300">ID de orden:</p>
          <p className="mt-1 font-mono text-emerald-300 break-all">{orderId}</p>
        </div>

        <Link
          to="/"
          className="inline-flex mt-6 rounded-xl border border-slate-700/50 px-4 py-2 text-sm font-semibold hover:border-slate-500/60 transition-colors"
        >
          Volver al catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <Link
          to="/cart"
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          ← Volver al carrito
        </Link>
      </div>

      <h1 className="text-3xl font-semibold">Checkout</h1>
      <p className="mt-2 text-slate-300">
        Completa tus datos para generar la orden en Firestore.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5"
        >
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm">
              <span className="text-slate-300">Nombre</span>
              <input
                name="name"
                value={buyer.name}
                onChange={onChange}
                className="rounded-xl border border-slate-700/50 bg-slate-950/40 px-3 py-2 outline-none focus:border-emerald-500/70"
                placeholder="Tu nombre"
                required
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-slate-300">Teléfono</span>
              <input
                name="phone"
                value={buyer.phone}
                onChange={onChange}
                className="rounded-xl border border-slate-700/50 bg-slate-950/40 px-3 py-2 outline-none focus:border-emerald-500/70"
                placeholder="Tu teléfono"
                required
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-slate-300">Email</span>
              <input
                type="email"
                name="email"
                value={buyer.email}
                onChange={onChange}
                className="rounded-xl border border-slate-700/50 bg-slate-950/40 px-3 py-2 outline-none focus:border-emerald-500/70"
                placeholder="correo@ejemplo.com"
                required
              />
            </label>

            <label className="grid gap-2 text-sm">
              <span className="text-slate-300">Confirmar email</span>
              <input
                type="email"
                name="emailConfirm"
                value={buyer.emailConfirm}
                onChange={onChange}
                className="rounded-xl border border-slate-700/50 bg-slate-950/40 px-3 py-2 outline-none focus:border-emerald-500/70"
                placeholder="correo@ejemplo.com"
                required
              />
            </label>
          </div>

          {errorMsg && (
            <div className="mt-4 rounded-2xl border border-red-500/20 bg-slate-950/40 p-3 text-sm text-red-300">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-5 w-full rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? "Generando orden..." : "Confirmar compra"}
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Al confirmar, se crea un documento en <span className="font-mono">orders</span> en Firestore.
          </p>
        </form>

        {/* Summary */}
        <aside className="rounded-2xl border border-slate-700/40 bg-slate-900/40 p-5 h-fit">
          <h2 className="text-lg font-semibold">Resumen</h2>

          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between text-slate-300">
              <span>Unidades</span>
              <span className="text-slate-100 font-semibold">{totalItems}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-300">Total</span>
              <span className="text-slate-100 font-semibold text-xl">
                ${Number(totalPrice ?? 0).toLocaleString("es-CO")}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-semibold text-slate-200">Productos</h3>
            <ul className="mt-3 grid gap-2 text-sm text-slate-300">
              {cart.map((p) => (
                <li key={p.id} className="flex justify-between gap-3">
                  <span className="truncate">
                    {p.title} <span className="text-slate-400">x{p.qty}</span>
                  </span>
                  <span className="text-slate-100 font-semibold">
                    ${Number(p.subtotal).toLocaleString("es-CO")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutForm;
