const mongoose = require("mongoose");

const dbConnect = () => {
  const DB_URI = process.env.DB_URI;
  mongoose.set("strictQuery", false);
  mongoose.connect(
    DB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err, res) => {
      if (!err) {
        console.log("*** Conexión correcta!");
      } else {
        console.log(`🚨 error en conexión bd ${err}`);
      }
    }
  );
};

const dbDisconnect = () => {
  mongoose.disconnect();
};

module.exports = { dbConnect, dbDisconnect };
