const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/metals", require("./routes/metalRoutes"));
app.use("/api/purity", require("./routes/purityRoutes"));
app.use("/api/rates", require("./routes/rateRoutes"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(process.env.PORT || 5000, () =>
    console.log("Server running")
  );
}).catch(err => console.log(err));
