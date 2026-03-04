console.log("Servidor iniciando...");

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productosRoutes from "./routes/producto.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import logger from "./utils/logger.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);

// Manejador de errores
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});