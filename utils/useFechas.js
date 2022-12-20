const moment = require("moment");

const useFechas = (mes) => {
  //construir fecha inicial y final del mes
  //fecha inicial
  const fechaIni = moment(
    `${mes.substring(0, 4)}-${mes.substring(4, 6)}-01T00:00:00`
  );

  //fecha final
  const fechaFin = moment(fechaIni).add(1, "months");

  return {
    fechaIni: fechaIni.format("YYYY-MM-DDT00:00:00"),
    fechaFin: fechaFin.format("YYYY-MM-DDT00:00:00"),
  };
};

module.exports = { useFechas };
