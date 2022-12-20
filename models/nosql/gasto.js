const mongoose = require("mongoose");

const GastoScheme = new mongoose.Schema(
  {
    fecha: {
      type: Date,
    },
    fechaRegistro: {
      type: String,
    },
    rfc: {
      type: String,
    },
    concepto: {
      type: String,
    },
    importe: {
      type: Number,
    },
    categoria: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "gasto",
  }
);

module.exports = mongoose.model("gasto", GastoScheme);
