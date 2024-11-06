const mongoose = require("mongoose");

const userScheme = new mongoose.Shema({
    email:{
        type: String,
        required: [true, "Este campo es Requerido"],
        unique: true,
        trim: true,
        lowercase: true,
        validate:{
            validator: (value) => {
                const emailRegex = /\S+@\S+\.\S+/;
                return emailRegex.test(value);
            },
            message: "Ingresar un correo válido."
        }
    },
    password:{
        type: String,
        required: [true, "Este campo es requerido."]
    },
    name:{
        type: String,
        required: false
    }
})

module.exports = mongoose.model("User", userScheme);