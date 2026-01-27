import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Todos los productos
export async function getProductsFS() {
  const colRef = collection(db, "products");
  const snap = await getDocs(colRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Productos por categoría
export async function getProductsByCategoryFS(categoryId) {
  const colRef = collection(db, "products");
  const q = query(colRef, where("category", "==", categoryId));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

// Producto por id
export async function getProductByIdFS(itemId) {
  const ref = doc(db, "products", itemId);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

// Crear orden en Firestore (colección "orders")
export async function createOrderFS(order) {
  const ordersRef = collection(db, "orders");
  const payload = {
    ...order,
    createdAt: Timestamp.fromDate(new Date()),
  };

  const docRef = await addDoc(ordersRef, payload);
  return docRef.id; 
}
