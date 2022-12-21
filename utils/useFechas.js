const moment = require("moment");

const useFechas = (mes) => {
  //construir fecha inicial y final del mes
  const fechaIni = `${mes.substring(0, 4)}-${mes.substring(4, 6)}-01T00:00:00Z`;

  //fecha final
  const fechaFin = moment(fechaIni).add(1, "months").add(6, "hours");

  return {
    fechaIni: fechaIni,
    fechaFin: fechaFin.format("YYYY-MM-DDT23:59:59"),
  };
};

module.exports = { useFechas };
