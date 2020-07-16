;
'use stric'

const  Estudiantes  = require('../modelos/Estudiantes'), 
       path        = require('path'),
       { ObjectId } = require('mongodb'),
       fs          = require('fs'),
       { unlink }  = require('fs')

let getAll = (req, res) => {
    Estudiantes.find()
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
    Estudiantes.find({'_id': id})
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

    Estudiantes.find({'nombre': elemento})
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
    
    console.log(datas)
    Estudiantes.create(datas)
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

let insertDataMany = async (req, res) => {
    let arrayPersons = req.body.data
    Estudiantes.insertMany(arrayPersons)
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
    Estudiantes.updateOne({'_id': new ObjectId(datas.id) }, datas.datosACambiar)
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
    Estudiantes.deleteOne({ '_id': id})
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

module.exports = {
    getAll,
    getById,
    getByElement,
    insertData,
    insertDataMany,
    updateData,
    deleteData
}