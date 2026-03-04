import mongoose from "mongoose";
import Producto from "../models/producto.model.js";

// Función helper para validar ObjectId
const validarObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET producto por ID
export const obtenerProductoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validarObjectId(id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const producto = await Producto.findById(id);

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST crear producto
export const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    res.status(201).json(productoGuardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// PUT actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validarObjectId(id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const productoActualizado = await Producto.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!productoActualizado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.status(200).json(productoActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    if (!validarObjectId(id)) {
      return res.status(400).json({ mensaje: "ID inválido" });
    }

    const productoEliminado = await Producto.findByIdAndDelete(id);

    if (!productoEliminado) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.status(200).json({ mensaje: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};