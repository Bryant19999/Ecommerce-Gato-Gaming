import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeItem } = useCart();

  return (
    <article className="flex gap-4 rounded-2xl border border-slate-700/40 bg-slate-900/40 p-4">
      <div className="h-20 w-20 overflow-hidden rounded-xl border border-slate-700/40 bg-slate-950/30">
        <img
          src={item.pictureUrl}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.title}</h3>
        <p className="text-sm text-slate-300 mt-1">
          Precio: ${Number(item.price ?? 0).toLocaleString("es-CO")}
        </p>
        <p className="text-sm text-slate-300">
          Cantidad: <span className="text-slate-100 font-semibold">{item.qty}</span>
        </p>
      </div>

      <div className="flex flex-col items-end justify-between">
        <p className="text-sm text-slate-300">
          Subtotal:{" "}
          <span className="text-slate-100 font-semibold">
            ${Number(item.subtotal ?? 0).toLocaleString("es-CO")}
          </span>
        </p>

        <button
          onClick={() => removeItem(item.id)}
          className="text-sm text-red-300 hover:text-red-200 transition-colors"
        >
          Eliminar
        </button>
      </div>
    </article>
  );
};

export default CartItem;
