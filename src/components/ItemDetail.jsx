import ItemCount from "./ItemCount";
import { useCart } from "../context/CartContext";

const ItemDetail = ({ item }) => {
  const { addItem } = useCart();

  const onAdd = (qty) => {
    addItem(qty);
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
            ${item.price.toLocaleString("es-CO")}
          </span>
          <span className="text-sm text-slate-400">
            ID: <span className="text-slate-200">{item.id}</span>
          </span>
        </div>

        <ItemCount stock={item.stock} initial={1} onAdd={onAdd} />
      </div>
    </article>
  );
};

export default ItemDetail;
