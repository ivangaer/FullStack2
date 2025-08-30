const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_EoJ8fu3XetFr@ep-solitary-surf-ac2utu3t-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Eliminar tablas en orden correcto para evitar errores por claves foráneas
    await client.query(`
      DROP TABLE IF EXISTS empresa CASCADE;
      DROP TABLE IF EXISTS proveedor CASCADE;
      DROP TABLE IF EXISTS feriado CASCADE;
      DROP TABLE IF EXISTS usuario CASCADE;
      DROP TABLE IF EXISTS perfil CASCADE;
      DROP TABLE IF EXISTS departamento CASCADE;
    `);

    // Crear tablas en orden correcto
    await client.query(`
      CREATE TABLE departamento(
        id SERIAL PRIMARY KEY,
        descripcion varchar(50) NOT NULL,
        estado varchar(10) NOT NULL
      );

      CREATE TABLE perfil(
        id SERIAL PRIMARY KEY,
        descripcion varchar(50) NOT NULL,
        observacion varchar(100),
        estado varchar(10) NOT NULL
      );

      CREATE TABLE usuario(
        id SERIAL PRIMARY KEY,
        usuario varchar(50) NOT NULL,
        contrasena varchar(50) NOT NULL,
        nombre varchar(50) NOT NULL,
        apellido varchar(50) NOT NULL,
        tipo_documento varchar(10) NOT NULL,
        numero_documento varchar(20) NOT NULL,
        perfil integer NOT NULL REFERENCES perfil(id),
        email varchar(50) NOT NULL,
        telefono varchar(20) NOT NULL,
        estado varchar(10) NOT NULL,
        departamento integer REFERENCES departamento(id),
        cargo varchar(50),
        superior integer REFERENCES usuario(id)
      );

      CREATE TABLE empresa(
        id SERIAL PRIMARY KEY,
        razon_social varchar(80) NOT NULL,
        ruc varchar(80) NOT NULL,
        celular_salida varchar(80) NOT NULL,
        direccion varchar(200) NOT NULL,
        contacto_responsable integer NOT NULL REFERENCES usuario(id),
        contacto_admin integer NOT NULL REFERENCES usuario(id),
        email varchar(80)
      );

      CREATE TABLE feriado(
        id SERIAL PRIMARY KEY,
        dia smallint NOT NULL,
        mes smallint NOT NULL,
        descripcion varchar(80) NOT NULL
      );

      CREATE TABLE proveedor(
        id SERIAL PRIMARY KEY,
        razon_social varchar(25) NOT NULL,
        nombre_fantasia varchar(25) NOT NULL,
        tipo_documento varchar(20) NOT NULL,
        numero_documento varchar(15) NOT NULL,
        pais varchar(50) NOT NULL DEFAULT 'PARAGUAY',
        departamento varchar(80) NOT NULL DEFAULT 'CENTRAL',
        ciudad varchar(80) NOT NULL DEFAULT 'LUQUE',
        barrio varchar(80),
        direccion varchar(100) NOT NULL,
        telefono varchar(20) NOT NULL,
        email varchar(80) NOT NULL,
        nombre_contacto varchar(40) NOT NULL,
        estado varchar(10) NOT NULL,
        CONSTRAINT proveedor_estado_check CHECK (estado IN ('Activo', 'Inactivo'))
      );
    `);

    await client.query('COMMIT');
    console.log('✅ Tablas eliminadas y creadas correctamente.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al crear tablas:', error);
  } finally {
    client.release();
  }
};

const insertSampleData = async () => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Insertar múltiples departamentos
    const depRes = await client.query(`
      INSERT INTO departamento (descripcion, estado)
      VALUES
      ('Sistemas', 'Activo'),
      ('Recursos Humanos', 'Activo'),
      ('Finanzas', 'Activo'),
      ('Marketing', 'Activo')
      RETURNING id;
    `);

    // Insertar múltiples perfiles
    const perfilRes = await client.query(`
      INSERT INTO perfil (descripcion, observacion, estado)
      VALUES
      ('Admin', 'Acceso total', 'Activo'),
      ('Gerente', 'Acceso gerencial', 'Activo'),
      ('Empleado', 'Acceso limitado', 'Activo')
      RETURNING id;
    `);

    const adminPerfilId = perfilRes.rows[0].id;
    const gerentePerfilId = perfilRes.rows[1].id;
    const empleadoPerfilId = perfilRes.rows[2].id;

    // Insertar múltiples usuarios (incluyendo un superior)
    const usuariosRes = await client.query(`
      INSERT INTO usuario (usuario, contrasena, nombre, apellido, tipo_documento, numero_documento, perfil, email, telefono, estado, departamento, cargo)
      VALUES
      ('jdoe', 'pass123', 'John', 'Doe', 'CI', '1234567', ${adminPerfilId}, 'jdoe@example.com', '0981123456', 'Activo', ${depRes.rows[0].id}, 'Jefe de Sistemas'),
      ('msmith', 'pass123', 'Maria', 'Smith', 'CI', '7654321', ${gerentePerfilId}, 'msmith@example.com', '0982654321', 'Activo', ${depRes.rows[1].id}, 'Gerente RRHH'),
      ('jgarcia', 'pass123', 'Jose', 'Garcia', 'CI', '1122334', ${empleadoPerfilId}, 'jgarcia@example.com', '0991987654', 'Activo', ${depRes.rows[0].id}, 'Desarrollador'),
      ('acarrillo', 'pass123', 'Ana', 'Carrillo', 'CI', '5566778', ${empleadoPerfilId}, 'acarrillo@example.com', '0971234567', 'Activo', ${depRes.rows[2].id}, 'Analista Financiero'),
      ('rlopez', 'pass123', 'Ricardo', 'Lopez', 'CI', '9988776', ${empleadoPerfilId}, 'rlopez@example.com', '0961876543', 'Activo', ${depRes.rows[3].id}, 'Especialista en Marketing')
      RETURNING id;
    `);

    // Obtener los IDs de los usuarios recién insertados
    const [adminId, gerenteId, empleado1Id, empleado2Id, empleado3Id] = usuariosRes.rows.map(row => row.id);

    // Actualizar el campo 'superior' en la tabla de usuarios
    await client.query(`
      UPDATE usuario SET superior = ${adminId} WHERE id = ${empleado1Id};
    `);

    // Insertar múltiples empresas
    await client.query(`
      INSERT INTO empresa (razon_social, ruc, celular_salida, direccion, contacto_responsable, contacto_admin, email)
      VALUES
      ('Mi Empresa S.A.', '80012345-6', '0981123456', 'Calle Falsa 123', ${adminId}, ${adminId}, 'empresa@example.com'),
      ('Compañía Tech Ltda.', '80098765-4', '0982654321', 'Avenida del Sol 456', ${gerenteId}, ${adminId}, 'tech@company.com'),
      ('Industrias del Sur S.A.', '80045678-9', '0991987654', 'Ruta 1, km 15', ${empleado2Id}, ${gerenteId}, 'isur@industrias.com');
    `);

    // Insertar múltiples feriados
    await client.query(`
      INSERT INTO feriado (dia, mes, descripcion)
      VALUES
      (1, 1, 'Año Nuevo'),
      (1, 3, 'Día de los Héroes'),
      (25, 12, 'Navidad');
    `);

    // Insertar múltiples proveedores
    await client.query(`
      INSERT INTO proveedor (razon_social, nombre_fantasia, tipo_documento, numero_documento, direccion, telefono, email, nombre_contacto, estado)
      VALUES
      ('Provee S.R.L.', 'Provee', 'RUC', '1234567-8', 'Av. Central 456', '021123456', 'contacto@provee.com', 'Maria Lopez', 'Activo'),
      ('Distribuidora Norte S.A.', 'DistriNorte', 'RUC', '8765432-1', 'Calle Principal 10', '021987654', 'info@distrinorte.com', 'Pedro Gimenez', 'Activo'),
      ('Servicios ABC', 'ABC', 'CI', '4455667', 'Barrio Obrero', '0985112233', 'ventas@abc.com.py', 'Juana Vera', 'Inactivo'),
      ('Suministros Globales', 'Global', 'RUC', '9988776-5', 'Calle 5ta, 321', '0975667788', 'contacto@global.com', 'Carlos Duarte', 'Activo');
    `);

    await client.query('COMMIT');
    console.log('✅ Datos de ejemplo insertados.');
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error al insertar datos:', error);
  } finally {
    client.release();
  }
};

const main = async () => {
  await createTables();
  await insertSampleData();
  await pool.end();
};

main();