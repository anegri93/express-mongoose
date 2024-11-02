require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./routes/Contact");

const app = express();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Conectado a MongoDB");
}).catch((error) => {
    console.error("Error al conectar a MongoDB:", error);
});

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api", Contact);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});