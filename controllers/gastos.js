const { gastoModel } = require("../models/");
const { useFechas } = require("../utils/useFechas");

const getItems = async (req, res) => {
  console.log("ok");
  const data = await gastoModel.find({});
  console.log(data);
  res.send({ data });
};

const getItem = async (req, res) => {
  res.send({ todo: true });
};

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

  // console.log(new Date(fechaIni));

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
        _id: "$categoria",
        gastoCategoria: {
          $sum: "$importe",
        },
      },
    },
    {
      $sort: { gastoCategoria: -1 },
    },
  ]);

  const setCategorias = new Map();
  setCategorias.set("SUPERMERCADOS", "Supermercado 🛒");
  setCategorias.set("SUPER", "Supermercado 🛒");
  setCategorias.set("TIENDAS", "Supermercado 🛒");
  setCategorias.set("FARMACIAS", "Salud");
  setCategorias.set("HOSPITALES", "Salud");
  setCategorias.set("VIAJES", "Esparcimiento ✈️  🍔");
  setCategorias.set("RESTAURANTES", "Esparcimiento ✈️  🍔");
  setCategorias.set("GASOLINA", "Autos");
  setCategorias.set("AUTOS", "Autos");
  setCategorias.set("TRANSPORTE", "Autos");
  setCategorias.set("ROPA", "Vestido 👗 👠 💍");
  setCategorias.set("AMAZON", "Casa 🏡");
  setCategorias.set("CASA", "Casa 🏡");

  data.forEach((categoria) => {
    // if (setCategorias.has(categoria._id))
    //   categoria.sup = setCategorias.get(categoria._id);

    categoria.sup = setCategorias.has(categoria._id)
      ? setCategorias.get(categoria._id)
      : "Otros";
  });

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

const udpateItems = async (req, res) => {
  const { dice, debe } = req.body;
  const bulk = gastoModel.updateMany(
    { categoria: dice },
    { $set: { categoria: debe } },
    function (err, result) {
      if (err) res.send(err);
      else res.send(result);
    }
  );
  // res.send({ update: 1 });
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  getItemsMes,
  getGastoMes,
  udpateItems,
};
