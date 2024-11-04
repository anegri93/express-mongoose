const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

router.post("/contact/add", async (req, res) => {
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

// GET para obtener todos los contactos
router.get("/contacts", async (req, res) => {
    try {
        const contacts = await Contact.find();
        
        if (contacts.length === 0) {
            return res.status(404).json({ msg: "No hay contactos disponibles." });
        }

        res.status(200).json(contacts);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener los contactos." });
    }
});


// GET para obtener un contacto por emailAddress
router.get("/contact/:emailAddress", async (req, res) => {
    try {
        const emailAddress = req.params.emailAddress;
        const contact = await Contact.findOne({ emailAddress: emailAddress });

        if (!contact) {
            return res.status(404).json({ msg: "No se encontró ningún contacto con ese email." });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener el contacto." });
    }
});

module.exports = router;