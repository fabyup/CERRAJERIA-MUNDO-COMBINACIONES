import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
 // Asumiendo que exportas la conexión desde db.js

dotenv.config();  // Cargar las variables de entorno desde el archivo .env

// Crear la conexión a la base de datos
  const connection = await mysql.createConnection({
  host: process.env.DB_HOST,         // Debe ser 'localhost' si estás trabajando en local
  user: process.env.DB_USER,         // Debe ser 'root' o tu usuario de MySQL
  password: process.env.DB_PASSWORD, // La contraseña configurada en tu MySQL
  database: process.env.DB_NAME      // Debe ser 'cerrajeria', como la base de datos que creamos
});

// Verificar conexión con la base de datos
try {
  await connection.connect();
  console.log('Conexión a la base de datos establecida con éxito');
} catch (error) {
  console.error('Error al conectar a la base de datos:', error.message);
}

export { connection };  // Exporta la conexión para usarla en otras partes de tu código





