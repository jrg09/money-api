const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  getItemsMes,
  getGastoMes,
  udpateItems,
  getGastoCategoriaMes,
} = require("../controllers/gastos");
const router = express.Router();

//TODO: http://localhost/prespuestos GET, POST, DELETE, PUT

router.get("/", getItems);
router.get("/:id", getItem);
router.get("/mes/:mes", getItemsMes);
router.get("/gastado/:mes", getGastoMes);
router.get("/:categoria/:mes", getGastoCategoriaMes);
router.post("/", createItem);
router.post("/update", udpateItems);

module.exports = router;
