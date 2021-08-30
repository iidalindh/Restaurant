const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoute = require("./routes/authRoute");
const bookingRoute = require("./routes/bookingRoute");

const app = express();
const PORT = process.env.React__App__PORT;

mongoose.set("useFindAndModify", false);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

app.use(authRoute);
app.use(bookingRoute);

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

mongoose.connect(
  process.env.React__App__DB_CONNECT,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.error(err);
    } else {
      console.log("connected to database");
    }
  }
);
