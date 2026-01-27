# Gato Gaming – E-commerce Gamer (React)

Proyecto final del curso de React.  
Aplicación web de tipo **e-commerce** desarrollada como **Single Page Application (SPA)** utilizando React, React Router y Firebase (Firestore) como base de datos.

La aplicación permite visualizar un catálogo de productos gamer, acceder al detalle de cada producto, gestionar un carrito de compras y generar órdenes almacenadas en Firestore.

---

## 🚀 Tecnologías utilizadas

- **React** (Vite)
- **React Router DOM**
- **Context API** (manejo de estado global del carrito)
- **Firebase Firestore**
- **JavaScript (ES6+)**
- **Tailwind CSS**

---

## 📦 Funcionalidades principales

### Catálogo de productos
- Listado dinámico de productos desde Firestore
- Filtrado por categorías mediante rutas dinámicas
- Vista de detalle individual por producto

### Detalle de producto
- Información completa del producto
- Control de stock
- Selector de cantidad (`ItemCount`)
- Agregado al carrito
- Mensajes condicionales (sin stock, producto agregado)

### Carrito de compras
- Estado global manejado con Context
- Visualización de productos agregados
- Cantidades, subtotales y total
- Eliminación de productos
- Vaciado completo del carrito
- Indicador de cantidad en `CartWidget`

### Checkout
- Formulario de datos del comprador
- Validaciones básicas
- Resumen de la compra
- Generación de orden en Firestore
- Visualización del **ID de la orden** generada

---

## 🔀 Navegación

La aplicación utiliza **React Router** respetando el modelo SPA:

- `/` → Catálogo general
- `/category/:categoryId` → Productos por categoría
- `/item/:itemId` → Detalle de producto
- `/cart` → Carrito de compras
- `/checkout` → Formulario de compra

No se producen recargas del navegador durante la navegación.

---

## ☁️ Firebase / Firestore

- Firestore se utiliza como base de datos en la nube
- Colección `products` para el catálogo
- Colección `orders` para registrar compras
- Consultas realizadas con:
  - `getDocs`
  - `query` + `where`
  - `getDoc`
  - `addDoc`

---

## ▶️ Cómo ejecutar el proyecto

1. Clonar el repositorio
```bash
git clone <https://github.com/Bryant19999/Ecommerce-Gato-Gaming>