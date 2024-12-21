import express from "express";
import { connection } from "./db.js"; // Asegúrate de tener correctamente la conexión a la base de datos

// Inicializamos el router de Express
const router = express.Router();

// Ruta para obtener todos los mensajes
router.get("/mensajes", async (req, res) => {
  try {
    console.log("Obteniendo todos los mensajes...");

    console.log("Conectado a la base de datos...");

    // Obtener todos los mensajes de la base de datos
    const [rows] = await connection.query("SELECT * FROM mensajes");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los mensajes:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para eliminar un mensaje por ID
router.delete("/mensajes/:id", async (req, res) => {
  console.log(`Eliminando mensaje con ID ${req.params.id}...`);

  console.log("Conectado a la base de datos...");

  const { id } = req.params; // Extraemos el ID del mensaje de la URL
  try {
    const [
      result
    ] = await connection.execute(
      "DELETE FROM mensajes WHERE id = ?", // Eliminamos el mensaje con el ID correspondiente
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    res.status(200).json({ message: "Mensaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
    res.status(500).json({ message: "Error al eliminar el mensaje", error });
  }
});

export default router;
