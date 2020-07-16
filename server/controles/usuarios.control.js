; 
'use strict'

const Usuario = require('../modelos/Usuarios'), 
    Roles = require('../modelos/Roles'),
    fs = require('fs'),
    jwt = require('jsonwebtoken'),
    bcrypt  = require('bcrypt'),
    { ObjectId } = require('mongodb');

let getAll = (req, res) => {
    Usuario.find()
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getById = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.find({'_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let getByElement = async (req, res) => {
    let campos = req.query.campo
    let elemento = req.query.elemento

    Usuario.find({'nombre': elemento})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: `Datos obtenidos ${data.length}`
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: err
        })
    })
}

let insertData = async (req, res) => {
    let datas = req.body.usuario
    
    if(!datas.password && datas.password == "")
    {
        return res.status(400).json({
            transaction: false,
            msg: 'Campos vacios!'
        })
    } else {
        Usuario.create(datas)
        .then(datas => {
            let rol = {
                idUsuario: datas._id,
                rol: req.body.rol,
                permission: req.body.permission
            }
        Roles.create(rol)
        .then(data => {
            res.status(200).json({
                transaction: true,
                data,
                msg: 'datos guardados..'
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
    }
}

let insertDataMany = async (req, res) => {
    let arrayPersons = req.body.data
    Usuario.insertMany(arrayPersons)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos guardados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let updateData = (req, res) => {
    let datas = req.body
    Usuario.updateOne({'_id': new ObjectId(datas.id) }, datas.datosACambiar)
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let deleteData = async (req, res) => {
    let id = new ObjectId(req.query.id)
    Usuario.deleteOne({ '_id': id})
    .then(data => {
        res.status(200).json({
            transaction: true,
            data,
            msg: 'datos actualizados..'
        })
    })
    .catch(err => {
        res.status(500).json({
            transaction: false,
            data: null,
            msg: `El error es: ${err}`
        })
    })
}

let loginUsuario = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if(email == "" || password == "")
    {
        return res.status(400).send('Campos Vacios')
    } else {
        Usuario.find({'email': email})
        .then(data => {
            if(bcrypt.compareSync(password, data[0].password)){
                let token = jwt.sign({data: data}, process.env.KEY_JWT, 
                    {algorithm: 'HS256', expiresIn: 60000})
                return res.status(200).json({
                    transaction: true,
                    token,
                    msg: 'Loggeded'
                })
            } else {
                return res.status(400).json({
                    transaction: true,
                    data: null,
                    msg: 'Credenciales incorrectas'
                })
            }
        })
        .catch(err =>{
            return res.status(400).json({
                transaction: false,
                data: null,
                msg: 'emial incorrecto'
            })
        })
    }
}

module.exports = {
    getAll,
    insertDataMany,
    insertData,
    updateData,
    getById,
    getByElement,
    deleteData,
    loginUsuario
}