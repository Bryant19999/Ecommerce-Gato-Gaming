import { Link } from "react-router-dom";

const Item = ({ item }) => {
  return (
    <article className="rounded-2xl border border-emerald-500/20 bg-slate-900/60 backdrop-blur p-4 shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
      <div className="aspect-[3/2] overflow-hidden rounded-xl border border-slate-700/40">
        <img
          src={item.pictureUrl}
          alt={item.title}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </div>

      <div className="mt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-emerald-400">
          {item.category}
        </p>

        <h3 className="mt-1 text-lg font-semibold">{item.title}</h3>

        <p className="mt-2 text-slate-300 text-sm line-clamp-2">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-base font-semibold">
            ${item.price.toLocaleString("es-CO")}
          </span>

          <Link
            to={`/item/${item.id}`}
            className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-emerald-400 transition-colors"
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Item;