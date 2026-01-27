import { useState } from "react";
import { Link } from "react-router-dom";
import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

const ItemDetail = ({ item }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const onAdd = (qty) => {
    addItem(item, qty);
    setAdded(true);
  };

  return (
    <article className="grid gap-8 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900/40">
        <img
          src={item.pictureUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400">
          {item.category}
        </p>

        <h1 className="mt-2 text-3xl md:text-4xl font-semibold">{item.title}</h1>

        <p className="mt-4 text-slate-300 leading-relaxed">{item.description}</p>

        <div className="mt-5 flex items-center gap-4">
          <span className="text-2xl font-semibold">
            ${Number(item.price ?? 0).toLocaleString("es-CO")}
          </span>
          <span className="text-sm text-slate-400">
            ID: <span className="text-slate-200">{item.id}</span>
          </span>
        </div>

        {}
        {Number(item.stock ?? 0) <= 0 ? (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-slate-900/60 p-4 text-red-300">
            Producto sin stock.
          </div>
        ) : added ? (
          
          <div className="mt-6 flex flex-col gap-3">
            <p className="text-sm text-emerald-300">
              Producto agregado al carrito ✅
            </p>

            <div className="flex gap-3">
              <Link
                to="/cart"
                className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors"
              >
                Ir al carrito
              </Link>

              <Link
                to="/"
                className="rounded-xl border border-slate-700/50 px-4 py-2 text-sm font-semibold text-slate-50 hover:border-slate-500/60 transition-colors"
              >
                Seguir comprando
              </Link>
            </div>
          </div>
        ) : (
          <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
        )}
      </div>
    </article>
  );
};

export default ItemDetail;
