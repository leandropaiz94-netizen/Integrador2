console.log("Servidor iniciando...");

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productosRoutes from "./routes/productos.routes.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Todas las rutas de productos
app.use("/api/productos", productosRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});