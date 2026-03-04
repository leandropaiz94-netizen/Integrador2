import express from "express";
import {
  crearCarrito,
  obtenerCarritoPorId,
  confirmarCompra
} from "../controllers/carrito.controller.js";

const router = express.Router();

router.post("/:id/confirmar", confirmarCompra);
router.post("/", crearCarrito);
router.get("/:id", obtenerCarritoPorId);

export default router;