require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Contact = require("./routes/Contact");

const app = express();

// Conexión a MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar a MongoDB:", error);
        process.exit(1);
    }
}

connectToDatabase();

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use("/api", Contact);

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});