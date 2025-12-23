import { useState } from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  const [open, setOpen] = useState(false);

  const closeMenu = () => setOpen(false);

  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-emerald-500/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-4">
        {}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <span className="text-2xl">🐱</span>
          <span className="text-lg font-semibold tracking-wide">
            Gato <span className="text-emerald-400">Gaming</span>
          </span>
        </Link>

        {}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link to="/category/smartphones" className="hover:text-emerald-400">
            Smartphones
          </Link>
          <Link to="/category/laptops" className="hover:text-emerald-400">
            Laptops
          </Link>
          <Link to="/category/fragrances" className="hover:text-emerald-400">
            Fragrances
          </Link>
          <Link to="/category/groceries" className="hover:text-emerald-400">
            Groceries
          </Link>
          <Link to="/category/home-decoration" className="hover:text-emerald-400">
            Home
          </Link>
        </nav>

        {}
        <div className="flex items-center gap-3">
          <CartWidget />

          {}
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

      {}
      {open && (
        <div className="md:hidden border-t border-slate-700/40 bg-slate-950/80 backdrop-blur">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-3 text-sm">
            <Link
              to="/category/smartphones"
              className="hover:text-emerald-400"
              onClick={closeMenu}
            >
              Smartphones
            </Link>
            <Link
              to="/category/laptops"
              className="hover:text-emerald-400"
              onClick={closeMenu}
            >
              Laptops
            </Link>
            <Link
              to="/category/fragrances"
              className="hover:text-emerald-400"
              onClick={closeMenu}
            >
              Fragrances
            </Link>
            <Link
              to="/category/groceries"
              className="hover:text-emerald-400"
              onClick={closeMenu}
            >
              Groceries
            </Link>
            <Link
              to="/category/home-decoration"
              className="hover:text-emerald-400"
              onClick={closeMenu}
            >
              Home
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;
