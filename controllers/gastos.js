const { gastoModel, categoriaModel } = require("../models/");
const { useFechas } = require("../utils/useFechas");

const getItems = async (req, res) => {
  // console.log("ok");
  const data = await gastoModel.find({});
  // console.log(data);
  res.send({ data });
};

const getItem = async (req, res) => {
  res.send({ todo: true });
};

const getItemsMes = async (req, res) => {
  const mes = req.params.mes;
  console.log("getItemsMes", mes);

  const result = await getGastosMes(mes);

  res.send(result);
};

const getGastoMes = async (req, res) => {
  console.log("getGastoMes");
  const mes = req.params.mes;
  const { fechaIni, fechaFin } = useFechas(mes);

  console.log({ mes, fechaIni, fechaFin });

  const data = getResumenMes(mes);

  res.send({ fechaIni, fechaFin, resultados: data.length, data });
};

const getGastoCategoriaMes = async (req, res) => {
  const idCategoria = req.params.categoria;
  const mes = req.params.mes;
  console.log("getGastoCategoriaMes", idCategoria, mes);

  const { fechaIni, fechaFin } = useFechas(mes);

  //get categorias de supCategoria
  const categorias = await categoriaModel
    .find({ supCategoria: idCategoria })
    .select("categoria");
  const categoriasSup = Array.from(
    categorias,
    (categoria) => categoria.categoria
  );

  const data = await gastoModel.find({
    categoria: { $in: categoriasSup },
    fecha: { $gte: fechaIni, $lt: fechaFin },
  });

  console.log("data", data);

  res.send({ fechaIni, fechaFin, resultados: data.length, data });
  //return { algo: 1 };
};

const createItem = async (req, res) => {
  const { body } = req;
  // console.log(body);
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

const getGastosMes = async (mes) => {
  const { fechaIni, fechaFin } = useFechas(mes);

  console.log({ mes: mes, fechaIni, fechaFin });

  const data = await gastoModel
    .find({
      fecha: { $gte: fechaIni, $lt: fechaFin },
    })
    .lean();
  const categorias = await categoriaModel.find({});

  data.forEach((gasto) => {
    gasto.sup =
      categorias.find((cat) => cat.categoria === gasto.categoria)
        ?.supCategoria ?? "Otros";
  });

  // console.log(dataNew[0]);

  return { fechaIni, fechaFin, resultados: data.length, data };
};

const getResumenMes = async (mes) => {
  const { fechaIni, fechaFin } = useFechas(mes);

  // console.log({
  //   getResumenMes: "getResumenMes",
  //   mes,
  //   fechaIni,
  //   fechaFin,
  // });

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

  const categorias = await categoriaModel.find({});

  data.forEach((cat) => {
    cat.sup =
      categorias.find((c) => c.categoria === cat._id)?.supCategoria ?? "Otros";
  });

  console.log(data);

  // data.forEach((categoria) => {
  //   // if (setCategorias.has(categoria._id))
  //   //   categoria.sup = setCategorias.get(categoria._id);

  //   categoria.sup = setCategorias.has(categoria._id)
  //     ? setCategorias.get(categoria._id)
  //     : "Otros";
  // });

  return data;
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
  getResumenMes,
  getGastoCategoriaMes,
  getGastosMes,
};
