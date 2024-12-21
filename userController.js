import connection from "db.js";

// Rutas para los mensajes

const obtenerMensajes = async (req, res) => {
  try {
    const [rows] = await connection.query("SELECT * FROM mensajes");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error });
  }
};

const eliminarMensaje = async (req, res) => {
  const { id } = req.params; // Extraemos el ID de la URL

  try {
    const [
      result
    ] = await connection.execute("DELETE FROM mensajes WHERE id = ?", [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Mensaje no encontrado" });
    }

    res.status(200).json({ message: "Mensaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar mensaje:", error);
    res.status(500).json({ message: "Error al eliminar el mensaje", error });
  }
};

export default { obtenerMensajes, eliminarMensaje };
