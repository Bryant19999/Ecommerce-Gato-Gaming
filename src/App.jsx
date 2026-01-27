import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";

import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="Bienvenido a Gato Gaming" />}
        />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Categoría" />}
        />
        <Route path="/item/:itemId" element={<ItemDetailContainer />} />

        {}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutForm />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
