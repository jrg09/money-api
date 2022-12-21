const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  getItemsMes,
  getGastoMes,
  udpateItems,
} = require("../controllers/gastos");
const router = express.Router();

//TODO: http://localhost/prespuestos GET, POST, DELETE, PUT

router.get("/", getItems);
router.get("/:id", getItem);
router.get("/mes/:mes", getItemsMes);
router.get("/gastado/:mes", getGastoMes);
router.post("/", createItem);
router.post("/update", udpateItems);

module.exports = router;
