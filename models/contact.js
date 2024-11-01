const mongoose = require("mongoose");

const contactScheme = new mongoose.Schema({
    firstname: {
        type: String,
        require: [true,"Este campo es Requerido."],
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
        require: [true,"Este campo es Requerido."]
    },
    emailAddress: {
        type: String,
        require: [true,"Este campo es Requerido."],
        unique: true
    },
    age:{
        type: Number,
        require: false
        //validar Numero
    }

})

module.exports = mongoose.model("Contact", contactScheme);