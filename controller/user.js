const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const User = require("../models/User");

const {JWT_SECRET, JWT_EXPIRES} = require("../config");

const validate = (email, password) => {
    let errors = [];
    if(email === undefined || email.trim() === ""){
        errors.push("El email no fué recibido.");
    }
    if(password === undefined || password.trim() === ""){
        errors.push("La contraseña no fué recibida.");
    }
    return errors;
};

const createUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const validation = validate(email, password);
        if(validation.length === 0){
            let pass = await bcryptjs.hash(password, 8);
            const newUser = new User({email: email, password: pass});
            await newUser.save();
            return res.status(200).json({msg:"El usuario fué creado exitosamente."});
        }else{
            console.log("Error: ", validation);
            res.status(400).json({msg:validation});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"No se pudo crear el usuario."});
    }
};

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const validation = validate(email, password);
        if(validation.length === 0){
            let info = await User.findOne({email: email});
            if (!info || !(await bcryptjs.compare(password, info.password))){
                return res.status(404).json({success:false, msg:"Usuario no encontrado."});
            };
            const token = jwt.sign({id: info._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES});
            const user = {id: info._id, email: info.email, token: token};
            return res.status(200).json({success:true, msg: "Autenticado Exitosamente", data: user});
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:"No te pudiste loguear."})
        
    }
};

module.exports = {createUser, loginUser};