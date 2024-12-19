const express = require("express");
const router = express.Router();
const Client = require("../models/client");
const verifyToken = require("../middleware/user")

router.post("/client/add", async (req, res) => {
    try {
        const newClient = new Client(req.body);
        await newClient.save().then((savedClient) => {
            console.log(savedClient);
            res.status(201).json({msg: "El cliente fue guardado exitosamente."});
        }).catch((error) =>{
            console.log(error);
            res.status(500).json({msg: "No fue posible crear el cliente."});    
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "No se pudo crear el cliente. Intente en unos minutos..."});
    }
});

// GET para obtener todos los clientes
router.get("/clients", verifyToken, async (req, res) => {
    try {
        const clients = await Client.find();
        if (clients.length === 0) {
            return res.status(404).json({ msg: "No hay clientes disponibles." });
        }
        res.status(200).json(clients);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener los clientes." });
    }
});

router.get("/client/search/:ci", verifyToken, async (req, res) => {
    try {
        const _ci = req.params.ci;
        const client = await Client.findOne({ _ci : _ci });

        if (!client) {
            return res.status(404).json({ msg: "No se encontró ningún cliente con ese ci." });
        }

        res.status(200).json(client);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al obtener el cliente." });
    }
});

//eliminar cliente por ci
router.delete("/client/delete/:ci", verifyToken, async (req, res) => {
    try {
        const _ci = req.params.ci;
        const client = await Client.findOneAndDelete({ _ci: _ci });
        res.status(200).json({ msg: "Cliente eliminado exitosamente." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al eliminar el cliente." });
    }
});

//actualizar cliente por ci
router.put("/client/update/:ci", verifyToken, async (req, res) => {
    try {
        const _ci = req.params.ci;
        const client = await Client.findOneAndUpdate({ _ci: _ci }, req.body);
        res.status(200).json({ msg: "Cliente actualizado exitosamente." });
    }catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Error al actualizar el cliente." });
    }
});


module.exports = router;