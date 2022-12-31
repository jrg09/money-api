const { presupuestoModel, gastoModel } = require("../models");
const { getResumenMes, getGastosMes } = require("./gastos");

const getItems = async (req, res) => {
  console.log("ok");
  const data = await presupuestoModel.find({});
  console.log(data);
  res.send({ data });
};

const getPresupuestoMes = async (req, res) => {
  const mes = req.params.mes;
  const data = await presupuestoModel.find({ mes });

  const gastos = await getGastosMes(mes);

  console.log("gastos", gastos);

  res.send({ data, gastos });
};

const getItem = async (req, res) => {
  const id = req.params.id;
  const data = await presupuestoModel.findById(id);
  console.log(data);
  res.send({ data });
};

const createItem = async (req, res) => {
  const { body } = req;
  console.log(body);
  const data = await presupuestoModel.create(body);
  res.send({ data });
};

const updateItem = async (req, res) => {
  try {
    const { _id, ...body } = req.body;
    console.log({ _id, body });
    //const data = await presupuestoModel

    const sum = body.categorias.reduce((acc, b) => acc + b.porcentaje, 0);

    if (sum.toFixed(2) != 1) {
      res.status(400);
      res.send({
        error: `Porcentaje mayor a 100% (${sum.toFixed(2)}) dif: ${
          1 - sum.toFixed(2)
        }`,
      });
      return;
    }

    const data = await presupuestoModel.findById(_id);

    data.importe = body.importe;
    data.categorias = body.categorias;
    data.save();

    res.send({ data });
  } catch (err) {
    console.log(err);
    res.send(`ocurrió un error`);
  }
};

const deleteItem = (req, res) => {};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getPresupuestoMes,
};
