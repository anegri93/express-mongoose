require('dotenv').config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Client = require("./routes/Clients");
const User = require("./routes/User");

const app = express();

// Habilitar CORS
app.use(cors({
    origin: "http://localhost:5173", // Cambia esto al origen de tu frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"] // Permitir el encabezado Content-Type y Authorization en las peticiones
}));

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


app.use("/api", Client);
app.use("/api", User);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});