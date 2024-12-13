import express from "express";
import { connection } from "./db.js"; // Importamos la conexión a la base de datos

const router = express.Router(); // Inicializamos el router de Express

// Ruta para manejar el envío del formulario de contacto
router.post("/contacto", async (req, res) => {
  const { nombre, telefono, mensaje } = req.body;

  // Validación básica
  if (!nombre || !telefono || !mensaje) {
    return res.status(400).json({ error: "Todos los campos son requeridos" });
  }
  try {
    const [
      result
    ] = await connection.execute(
      "INSERT INTO mensajes (nombre, telefono, mensaje) VALUES (?, ?, ?)",
      [nombre, telefono, mensaje]
    );

    res.status(200).json({
      message: "Mensaje recibido con éxito",
      data: {
        id: result.insertId,
        nombre,
        telefono,
        mensaje
      }
    });
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para obtener todos los mensajes
router.get("/mensajes", async (req, res) => {
  try {
    // Obtener todos los mensajes de la base de datos
    const [rows] = await connection.query("SELECT * FROM mensajes");
    res.json(rows);
  } catch (error) {
    console.error("Error al guardar el mensaje:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
