const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = 3000;

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./rucpy.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Middleware para parsear JSON
app.use(express.json());

// Endpoint para listar registros por RUC (búsqueda parcial)
app.get('/contribuyente/:ruc', (req, res) => {
    const ruc = req.params.ruc;
    if (!ruc) {
        res.status(400).json({ error: 'Debe ingresar un RUC para buscar.' });
        return;
    }
    // CAST ruc AS TEXT para búsqueda parcial
    const sql = `SELECT * FROM Contribuyente WHERE CAST(ruc AS TEXT) LIKE ?`;
    db.all(sql, [`%${ruc}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: 'Error al consultar la base de datos: ' + err.message });
            return;
        }
        if (rows && rows.length > 0) {
            res.json({ resultados: rows });
        } else {
            res.status(404).json({ 
                error: true,
                message: `No se encontraron contribuyentes con el RUC que contenga "${ruc}".`
            });
        }
    });
});

// Endpoint para buscar por razón social de manera insensible a mayúsculas/minúsculas
app.get('/razonsocial', (req, res) => {
    const razonSocial = req.query.razonSocial;
    if (!razonSocial) {
        res.status(400).json({ message: 'El parámetro razonSocial es requerido' });
        return;
    }
    const sql = `SELECT * FROM Contribuyente WHERE LOWER(razonSocial) LIKE LOWER(?)`;
    db.all(sql, [`%${razonSocial}%`], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ resultados: rows });
    });
});


// Ruta principal con formulario de búsqueda por ruc
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta principal con formulario de búsqueda por razon social
app.get('/buscar', (req, res) => {
    res.sendFile(__dirname + '/buscar.html');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});