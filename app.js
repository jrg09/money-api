require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { dbConnect, dbDisconnect } = require("./config/mongo");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 9091;

//aquí se invocan las rutas
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log(`Tu app está lista para correr en http://localhost:${port}/`);
});

dbConnect();

// This now works, and waits until the client is destroyed before exiting.
process.on("SIGINT", async () => {
  console.log("(SIGINT) Shutting down...");
  dbDisconnect();
  console.log("db disconnected");
  process.exit(0);
});
