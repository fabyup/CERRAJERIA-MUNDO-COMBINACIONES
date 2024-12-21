import dotenv from "dotenv"; // Si usas módulos ES

import express from "express";
import contactoRoutes from "./contactoRoutes.js"; // Asegúrate de que la extensión .js esté incluida

const app = express();
dotenv.config();
app.use(express.json()); // Middleware para parsear el body de las solicitudes

// Rutas bajo el prefijo /api
app.use("/api", contactoRoutes);

// Arrancar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
