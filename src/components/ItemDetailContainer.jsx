import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import ItemDetail from "./ItemDetail";
import { getProductByIdFS } from "../services/firestore";

const ItemDetailContainer = () => {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrorMsg("");

    getProductByIdFS(itemId)
      .then((res) => {
        if (!isMounted) return;
        setItem(res || null);
      })
      .catch((err) => {
        console.error("Error cargando producto:", err);
        if (!isMounted) return;
        setItem(null);
        setErrorMsg("Ocurrió un error cargando el producto.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
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
      ) : errorMsg ? (
        <div className="text-center text-red-300">{errorMsg}</div>
      ) : !item ? (
        <div className="text-center text-slate-300">Producto no encontrado.</div>
      ) : (
        <ItemDetail item={item} />
      )}
    </section>
  );
};

export default ItemDetailContainer;
