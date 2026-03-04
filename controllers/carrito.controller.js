import Carrito from "../models/carrito.model.js";
import Producto from "../models/producto.model.js";

// Crear carrito con validaciones
export const crearCarrito = async (req, res) => {
  try {
    const { productos } = req.body;

    // Validar que productos exista y sea un array
    if (!productos || !Array.isArray(productos) || productos.length === 0) {
      return res.status(400).json({
        mensaje: "Debe enviar un array de productos válido",
      });
    }

    // Validar cada producto
    for (const item of productos) {
      if (!item.producto || !item.cantidad) {
        return res.status(400).json({
          mensaje: "Cada item debe tener producto y cantidad",
        });
      }

      if (item.cantidad <= 0) {
        return res.status(400).json({
          mensaje: "La cantidad debe ser mayor a 0",
        });
      }

      const productoDB = await Producto.findById(item.producto);

      if (!productoDB) {
        return res.status(404).json({
          mensaje: `Producto con ID ${item.producto} no encontrado`,
        });
      }

      if (item.cantidad > productoDB.stock) {
        return res.status(400).json({
          mensaje: `Stock insuficiente para ${productoDB.nombre}`,
        });
      }
    }

    const nuevoCarrito = new Carrito({ productos });
    await nuevoCarrito.save();

    res.status(201).json({
      mensaje: "Carrito guardado correctamente",
      carrito: nuevoCarrito,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al guardar el carrito",
      error: error.message,
    });
  }
};

// Obtener carrito por ID con populate y total calculado
export const obtenerCarritoPorId = async (req, res) => {
  try {
    const carrito = await Carrito.findById(req.params.id)
      .populate("productos.producto");

    if (!carrito) {
      return res.status(404).json({
        mensaje: "Carrito no encontrado",
      });
    }

    // Calcular total dinámicamente
    const total = carrito.productos.reduce((acc, item) => {
      return acc + item.producto.precio * item.cantidad;
    }, 0);

    res.json({
      carrito,
      total,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al obtener el carrito",
      error: error.message,
    });
  }
};
export const confirmarCompra = async (req, res) => {
  try {
    const carrito = await Carrito.findById(req.params.id)
      .populate("productos.producto");

    if (!carrito) {
      return res.status(404).json({ mensaje: "Carrito no encontrado" });
    }

    for (const item of carrito.productos) {
      const productoDB = await Producto.findById(item.producto._id);

      if (item.cantidad > productoDB.stock) {
        return res.status(400).json({
          mensaje: `Stock insuficiente para ${productoDB.nombre}`,
        });
      }

      productoDB.stock -= item.cantidad;
      await productoDB.save();
    }

    res.json({ mensaje: "Compra confirmada con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};