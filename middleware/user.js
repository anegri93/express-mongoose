const express = require("express");
const Jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");

const router = express.Router();

router.use((req, res, next) => {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    if (!token){
        return res.status(401).json({msg:"No Autorizado."})
    };
    if(token.startsWith("Bearer")){
        token = token.slice(7,token.length);
        Jwt.verify(token, JWT_SECRET, (error, decoded)=>{
            if(!error){
                return res.status(401).json({msg:"Token Inválido."})
            }else{
                req.decoded = decoded;
                next();
            }
        });
    };
});

module.exports = router;




