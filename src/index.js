const express = require("express");
const morgan = require("morgan");
const { use } = require("./routes/index");
const app = express();
const cors = require("cors");

require("./database");

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// Router
app.use("/api", require("./routes/index"));

app.listen(3000);
console.log("Server on port ", 3000);
