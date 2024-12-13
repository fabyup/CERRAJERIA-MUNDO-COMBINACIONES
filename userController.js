import connection from "db.js";

const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM mensajes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

// Crear un nuevo usuario
const crearUsuario = async (req, res) => {
  const { nombre, apellido, fecha_nacimiento, email, telefono } = res.body;
  try {
    const [
      result
    ] = await connection.execute(
      "INSERT INTO usuarios (nombre, apellido, fecha_nacimiento, email, telefono) VALUES (?, ?, ?, ?, ?)",
      [nombre, apellido, fecha_nacimiento, email, telefono]
    );
    res.status(201).json({ message: "Usuario creado", id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error al crear usuario", error });
  }
};

export default { obtenerUsuarios, crearUsuario };
