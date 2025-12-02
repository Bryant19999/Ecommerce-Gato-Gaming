import CartWidget from "./CartWidget";

const NavBar = () => {
  return (
    <header className="sticky top-0 z-20 bg-slate-900/90 backdrop-blur border-b border-emerald-500/60">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-6">
        {/* Branding */}
        <div className="flex items-center gap-2">
          <span className="text-3xl">😼</span>
          <span className="text-lg font-semibold tracking-wide">
            Gato <span className="text-emerald-400">Gaming</span>
          </span>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Placas de video
          </a>
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Teclados 
          </a>
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Mouses
          </a>
          <a href="#" className="hover:text-emerald-400 transition-colors">
            Auriculares
          </a>
        </nav>

        {/* Carrito */}
        <CartWidget />
      </div>
    </header>
  );
};

export default NavBar;
