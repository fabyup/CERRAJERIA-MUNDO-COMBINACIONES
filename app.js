import express from "express";

import cors from "cors";
import contactoRoutes from "./contactoRoutes.js";

const app = express();

// Middleware para permitir CORS
app.use(cors());
// Middleware para parsear cuerpos JSON
app.use(express.json());

// Rutas
app.use("/api", contactoRoutes); // Aquí estamos usando la ruta correcta

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
