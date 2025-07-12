// Ejemplo simple de NodeJS sin usar archivos

// 1. Lista de productos
const productos = [
  { id: 1, nombre: "Laptop", precio: 999 },
  { id: 2, nombre: "Teléfono", precio: 599 },
  { id: 3, nombre: "Tablet", precio: 299 }
];

// 2. Función para mostrar productos
function mostrarProductos() {
  console.log("\nProductos Disponibles:");
  productos.forEach(producto => {
    console.log(`${producto.id}. ${producto.nombre} - $${producto.precio}`);
  });
}

// 3. Función para buscar producto
function buscarProducto(id) {
  return productos.find(p => p.id === id);
}

// 4. Función asíncrona simulada
async function buscarConDelay(id) {
  console.log("\nBuscando producto...");
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simula delay
  return buscarProducto(id);
}

// Ejecución del programa
(async () => {
  mostrarProductos();
  
  const producto = await buscarConDelay(2);
  console.log("\nResultado de búsqueda:");
  console.log(producto);
  
  console.log("\n¡Ejemplo completado! 🎉");
})();