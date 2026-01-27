import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ItemList from "./ItemList";
import { getProductsFS, getProductsByCategoryFS } from "../services/firestore";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setErrorMsg("");

    const request = categoryId
      ? getProductsByCategoryFS(categoryId)
      : getProductsFS();

    request
      .then((res) => {
        if (!isMounted) return;
        setItems(res);
      })
      .catch((err) => {
        console.error("Error cargando productos:", err);
        if (!isMounted) return;
        setItems([]);
        setErrorMsg("Ocurrió un error cargando los productos.");
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [categoryId]);

  const title = categoryId ? `Categoría: ${categoryId.replace("-", " ")}` : greeting;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3">
          Ecommerce · Catálogo de productos
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold">{title}</h1>

        <p className="text-sm md:text-base text-slate-300 mt-3 max-w-2xl mx-auto">
          Descubre una selección de productos destacados en distintas categorías,
          con precios actualizados y disponibilidad en tiempo real.
        </p>
      </div>

      {loading ? (
        <div className="text-center text-slate-300">Cargando productos...</div>
      ) : errorMsg ? (
        <div className="text-center text-red-300">{errorMsg}</div>
      ) : items.length === 0 ? (
        <div className="text-center text-slate-300">
          No hay productos en esta categoría.
        </div>
      ) : (
        <ItemList items={items} />
      )}
    </section>
  );
};

export default ItemListContainer;
