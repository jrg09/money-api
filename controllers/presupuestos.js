const { presupuestoModel } = require("../models");

const getItems = async (req, res) => {
  console.log("ok");
  const data = await presupuestoModel.find({});
  console.log(data);
  res.send({ data });
};

const getPresupuestoMes = async (req, res) => {
  const mes = req.params.mes;
  const data = await presupuestoModel.find({ mes });
  res.send({ data });
};

const getItem = (req, res) => {};

const createItem = async (req, res) => {
  const { body } = req;
  console.log(body);
  const data = await presupuestoModel.create(body);
  res.send({ data });
};

const updateItem = (req, res) => {};

const deleteItem = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getPresupuestoMes,
};
