import dotenv from "dotenv"; // Si usas módulos ES
import express from "express";
import contactoRoutes from "./contactoRoutes.js"; // Asegúrate de que la extensión .js esté incluida

dotenv.config(); // Configuración de variables de entorno

const app = express();
app.use(express.json()); // Middleware para parsear el body de las solicitudes

// Ruta para agregar mensajes directamente
app.post("/mensajes/", (req, res) => {
  const { mensaje } = req.body; // Asumiendo que el mensaje viene en el cuerpo de la solicitud

  if (!mensaje) {
    return res.status(400).send({ error: "El mensaje es obligatorio" });
  }

  // Aquí podrías manejar el mensaje, como guardarlo en una base de datos o memoria
  res.status(201).send({ success: true, mensajeGuardado: mensaje });
});

// Rutas bajo el prefijo /api
app.use("/api", contactoRoutes);

// Arrancar el servidor
const PORT = process.env.PORT || 3000; // Puedes usar un puerto definido en el archivo .env
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
