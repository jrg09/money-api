const { categoriaModel } = require("../models/");

const getItems = async (req, res) => {
  console.log("categorias getItems");
  // console.log(data);
  // data.sort((a, b) => a.supCategoria > b.supCategoria);
  const data = await getListadoCategorias();
  res.send({ data });
};

const createItem = async (req, res) => {
  const { body } = req;
  console.log(body);
  const data = await categoriaModel.create(body);
  res.send({ data });
};

const updateItem = async (req, res) => {
  try {
    //const id = req.params.id;
    const { _id, ...body } = req.body;
    //console.log({ id, categoria, supCategoria });
    //const data = await presupuestoModel

    // const data = await categoriaModel.findById(_id);

    // data.importe = body.importe;
    // data.categorias = body.categorias;
    // data.save();
    //const data = await categoriaModel.findById({ _id: id });
    const data = await categoriaModel
      .findByIdAndUpdate(_id, body)
      .setOptions({ new: true });
    // const data = await categoriaModel
    //   .findOneAndUpdate({ _id: _id }, body)
    //   .setOptions({ new: true });

    console.log(data);

    res.send({ data });
  } catch (err) {
    console.log(err);
    res.send(JSON.stringify(err));
  }
};

const getListadoCategorias = async () => {
  const data = await categoriaModel.find({}).sort({ supCategoria: 1 });
  return data;
};

module.exports = {
  getItems,
  createItem,
  updateItem,
  getListadoCategorias,
};
