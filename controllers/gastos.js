const { gastoModel } = require("../models/");
const { useFechas } = require("../utils/useFechas");

const getItems = async (req, res) => {
  console.log("ok");
  const data = await gastoModel.find({});
  console.log(data);
  res.send({ data });
};

const getItem = async (req, res) => {};

const getItemsMes = async (req, res) => {
  const { fechaIni, fechaFin } = useFechas(req.params.mes);

  console.log({ mes: req.params.mes, fechaIni, fechaFin });

  const data = await gastoModel.find({
    fecha: { $gte: fechaIni, $lt: fechaFin },
  });

  res.send({ fechaIni, fechaFin, resultados: data.length, data });
};

const getGastoMes = async (req, res) => {
  const { fechaIni, fechaFin } = useFechas(req.params.mes);

  console.log({
    mes: req.params.mes,
    fechaIni,
    fechaFin,
  });

  const data = await gastoModel.aggregate([
    {
      $match: {
        fecha: {
          $gte: new Date(fechaIni),
          $lt: new Date(fechaFin),
        },
      },
    },
    {
      $group: {
        _id: null,
        gastado: {
          $sum: "$importe",
        },
        egresos: {
          $sum: 1,
        },
      },
    },
  ]);

  res.send({ fechaIni, fechaFin, resultados: data.length, data });
};

const createItem = async (req, res) => {
  const { body } = req;
  console.log(body);
  const data = await gastoModel.create(body);
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
  getItemsMes,
  getGastoMes,
};
