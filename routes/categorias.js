const express = require("express");
const {
  getItems,
  createItem,
  updateItem,
  //   getItem,
  //   getItemsMes,
  //   getGastoMes,
  //   getGastoCategoriaMes,
} = require("../controllers/categorias");
const router = express.Router();

//TODO: http://localhost/prespuestos GET, POST, DELETE, PUT

router.get("/", getItems);
router.post("/", createItem);
router.put("/:id", updateItem);
// router.get("/:id", getItem);
// router.get("/mes/:mes", getItemsMes);
// router.get("/gastado/:mes", getGastoMes);
// router.get("/:categoria/:mes", getGastoCategoriaMes);

module.exports = router;
