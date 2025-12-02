const ItemListContainer = ({ greeting }) => {
  return (
    <section className="flex items-center justify-center py-12 px-4">
      <div
        className="w-full max-w-4xl
          rounded-2xl border border-emerald-500/30
          bg-gradient-to-b from-slate-900/80 to-slate-950/90
          shadow-[0_20px_60px_rgba(0,0,0,0.8)]
          p-8 md:p-10 text-center"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-emerald-400 mb-3">
          Ecommerce gamer · Componentes & periféricos
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold mb-4">
          {greeting}
        </h1>

        <p className="text-sm md:text-base text-slate-300 mb-6 max-w-2xl mx-auto">
          Arma tu setup como un verdadero gato gamer: tarjetas gráficas,
          teclados mecánicos, mouses de alta precisión, auriculares con sonido
          envolvente y más. Todo en un solo lugar.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <button className="px-5 py-2.5 rounded-full bg-emerald-500 text-slate-900 font-medium text-sm hover:bg-emerald-400 transition-colors">
            Ver componentes destacados
          </button>
          <button className="px-5 py-2.5 rounded-full border border-slate-600 text-slate-200 text-sm hover:border-emerald-400 hover:text-emerald-300 transition-colors">
            Ver periféricos
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemListContainer;
