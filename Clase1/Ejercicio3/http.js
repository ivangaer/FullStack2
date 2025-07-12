const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  // Parsear la URL para obtener el parámetro 'nombre'
  const query = url.parse(req.url, true).query;
  const nombre = query.nombre || 'Usuario';

  // Configurar encabezados de respuesta
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Crear una respuesta creativa con el nombre del usuario
  const respuesta = `<h1>Hola, ${nombre}!</h1><p>Bienvenido al servidor creativo con Node.js</p>`;

  // Enviar la respuesta al cliente
  res.end(respuesta);
});

const puerto = 3000;

// Iniciar el servidor en el puerto especificado
server.listen(puerto, () => {
  console.log(`Servidor en ejecución en http://localhost:${puerto}`);
});
// Puedes probarlo accediendo a http://localhost:3000/?nombre=TuNombre
// o simplemente http://localhost:3000/ para ver el mensaje por defecto.