const mongoose = require("mongoose");

const PresupuestoScheme = new mongoose.Schema(
  {
    mes: {
      type: String,
    },
    importe: {
      type: Number,
    },
    categorias: [
      {
        categoria: {
          type: String,
        },
        porcentaje: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("presupuesto", PresupuestoScheme);
