import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <NavBar />
      <ItemListContainer greeting="Bienvenido a Gato Gaming" />
    </div>
  );
}

export default App;