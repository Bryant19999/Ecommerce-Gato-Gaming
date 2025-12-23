import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ItemDetail from "./ItemDetail";
import { getProductById } from "../data/products";

const ItemDetailContainer = () => {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    getProductById(itemId)
      .then((res) => setItem(res || null))
      .finally(() => setLoading(false));
  }, [itemId]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-6">
        <Link
          to="/"
          className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
        >
          ← Volver al catálogo
        </Link>
      </div>

      {loading ? (
        <div className="text-center text-slate-300">Cargando detalle...</div>
      ) : !item ? (
        <div className="text-center text-slate-300">
          Producto no encontrado.
        </div>
      ) : (
        <ItemDetail item={item} />
      )}
    </section>
  );
};

export default ItemDetailContainer;