console.log("Servidor iniciando...");

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productosRoutes from "./routes/producto.routes.js";
import carritoRoutes from "./routes/carrito.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Rutas
app.use("/api/productos", productosRoutes);
app.use("/api/carrito", carritoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});