import { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  const categories = [
    { id: "teclados", label: "Teclados" },
    { id: "mouses", label: "Mouses" },
    { id: "auriculares", label: "Auriculares" },
    { id: "monitores", label: "Monitores" },
    { id: "almacenamiento", label: "Almacenamiento" },
  ];

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-emerald-500/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-2xl">🐱</span>
          <span className="text-lg font-semibold tracking-wide">
            Gato <span className="text-emerald-400">Gaming</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/category/${c.id}`}
              className="hover:text-emerald-400"
            >
              {c.label}
            </Link>
          ))}

          {}
          <Link to="/cart" className="hover:text-emerald-400">
            Carrito
          </Link>
        </nav>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link to="/cart" onClick={closeMenu}>
            <CartWidget />
          </Link>

          {/* Mobile toggle */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-xl border border-slate-700/50 px-3 py-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {open && (
        <div className="md:hidden border-t border-slate-700/40 bg-slate-950/80 backdrop-blur">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm">
            {categories.map((c) => (
              <Link
                key={c.id}
                to={`/category/${c.id}`}
                className="hover:text-emerald-400"
                onClick={closeMenu}
              >
                {c.label}
              </Link>
            ))}

            {/* Carrito mobile */}
            <Link
              to="/cart"
              className="hover:text-emerald-400"
              onClick={closeMenu}
            >
              Carrito
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
