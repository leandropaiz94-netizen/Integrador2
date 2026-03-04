import mongoose from "mongoose";

const carritoSchema = new mongoose.Schema(
  {
    productos: [
      {
        producto: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Producto",
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    estado: {
      type: String,
      enum: ["pendiente", "confirmado"],
      default: "pendiente",
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Carrito = mongoose.model("Carrito", carritoSchema);

export default Carrito;