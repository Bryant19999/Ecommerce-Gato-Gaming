import { useState } from "react";

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
  const safeInitial = Math.min(Math.max(initial, 1), Math.max(stock, 1));
  const [count, setCount] = useState(safeInitial);

  const decrement = () => setCount((c) => Math.max(1, c - 1));
  const increment = () => setCount((c) => Math.min(stock, c + 1));

  const handleAdd = () => {
    if (stock <= 0) return;
    if (onAdd) onAdd(count);
  };

  return (
    <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-slate-900/60 p-4">
      <p className="text-sm text-slate-300">
        Stock disponible: <span className="text-slate-50 font-semibold">{stock}</span>
      </p>

      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={decrement}
          disabled={stock <= 0 || count <= 1}
          className="rounded-xl border border-slate-700/50 px-4 py-2 text-slate-50 disabled:opacity-40"
        >
          -
        </button>

        <span className="min-w-10 text-center text-lg font-semibold">{count}</span>

        <button
          onClick={increment}
          disabled={stock <= 0 || count >= stock}
          className="rounded-xl border border-slate-700/50 px-4 py-2 text-slate-50 disabled:opacity-40"
        >
          +
        </button>

        <button
          onClick={handleAdd}
          disabled={stock <= 0}
          className="ml-auto rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 transition-colors disabled:opacity-40"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default ItemCount;