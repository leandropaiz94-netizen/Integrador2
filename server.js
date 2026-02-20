console.log("Servidor iniciando...");

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Producto from "./models/producto.model.js";

dotenv.config();

// 🔥 Conectar a la base
connectDB();

const app = express();

// Middleware para JSON
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

// Crear producto
app.post("/api/productos", async (req, res) => {
  try {
    const producto = new Producto(req.body);
    const productoGuardado = await producto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

app.get("/api/productos", async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});