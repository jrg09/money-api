const express = require("express");
const {
  getItems,
  getItem,
  createItem,
  getPresupuestoMes,
  updateItem,
} = require("../controllers/presupuestos");
const router = express.Router();

//TODO: http://localhost/prespuestos GET, POST, DELETE, PUT

router.get("/", getItems);
router.get("/mes/:mes", getPresupuestoMes);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);

module.exports = router;
