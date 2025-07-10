require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDb = require("./db");
const urlRoutes = require("./Router/urlRouter");



const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use("/", urlRoutes);
connectDb();

app.listen(PORT, () => {
    console.log("server running at ", PORT);
})

