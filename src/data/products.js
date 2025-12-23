const BASE_URL = "https://dummyjson.com";

const mapProduct = (p) => ({
  id: String(p.id),
  title: p.title,
  price: p.price * 1000, 
  stock: p.stock ?? 10,
  category: p.category,
  description: p.description,
  pictureUrl:
    p.thumbnail ||
    (p.images && p.images[0]) ||
    "https://via.placeholder.com/600x400?text=Producto",
});

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  const data = await res.json();
  return data.products.map(mapProduct);
}

export async function getProductsByCategory(categoryId) {
  const res = await fetch(
    `${BASE_URL}/products/category/${encodeURIComponent(categoryId)}`
  );
  const data = await res.json();
  return data.products.map(mapProduct);
}

export async function getProductById(itemId) {
  const res = await fetch(`${BASE_URL}/products/${itemId}`);
  if (!res.ok) return null;
  const data = await res.json();
  return mapProduct(data);
}