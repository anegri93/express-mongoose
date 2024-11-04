const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true,"Este campo es Requerido."],
        minLength: 3,
        maxLength: 20,
        trim: true,
        validate:{  
            validator: (value) => {
                const nameRegex = /^[A-Za-z]+$/;
                return nameRegex.test(value);
            },
            message: "Ingresar solamente letras."
        }
    },
    lastName: {
        type: String,
        required: [true,"Este campo es Requerido."],
        validate:{
            validator: (value) => {
                const nameRegex = /^[A-Za-z]+$/;
                return nameRegex.test(value);
            },
            message: "Ingresar solamente letras."
        }
    },
    emailAddress: {
        type: String,
        required: [true,"Este campo es Requerido."],
        unique: true,
        trim: true,
        lowercase: true,
        //Validar Mail
        validate:{
            validator: (value) => {
                const emailRegex = /\S+@\S+\.\S+/;
                return emailRegex.test(value);
            },
            message: "Ingresar un correo válido."
        }
    },
    age:{
        type: Number,
        require: false,
        //validar Numero
        validate:{
            validator: (value) => {
                return Number.isInteger(value);
            },
            message: "Ingresar un número entero."
        }
    }

});

module.exports = mongoose.model("Contact", contactScheme);