const mongoose = require("mongoose");

const clientScheme = new mongoose.Schema({
    ci:{
        type: Number,
        require: true,
        //validar Numero
        validate:{
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Ingresar un número entero."
        }
    },
    name: {
        type: String,
        required: [true,"Este campo es Requerido."],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate:{  
            validator: (value) => {
                const nameRegex = /^[A-Za-z ]+$/;
                return nameRegex.test(value);
            },
            message: "Ingresar solamente letras."
        }
    },
    dueDate:{
        type: Number,
        require: true,
        //validar Numero
        validate:{
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Ingresar un número entero."
        }
    },
    phone:{
        type: String,
        required: [true,"Este campo es Requerido."],
        minLength: 10,
        trim: true
    }
});

module.exports = mongoose.model("Client", clientScheme);