const mongoose = require("mongoose");

const CategoriaScheme = new mongoose.Schema(
  {
    categoria: {
      type: String,
    },
    supCategoria: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    collection: "categoria",
  }
);

module.exports = mongoose.model("categoria", CategoriaScheme);
