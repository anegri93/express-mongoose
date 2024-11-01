const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/contact", async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save().then((savedContact) => {
            console.log(savedContact);
            res.status(201).json({msg: "El contacto fue guardado exitosamente."});
        }).catch((error) =>{
            console.log(error);
            res.status(500).json({msg: "No fue posible crear el contacto."});    
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "No se pudo crear el contacto. Intente en unos minutos..."});
    }
});

module.exports = router;