/*

NO SE HACE AÚN

*/


const express = require('express');
const router = express.Router();

const Alumnos = require('../model/Alumno');

router.get('/', (req, res) => {
    Alumnos.find({}, (error, alumnos) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: alumnos
            });
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Alumnos.findById(id, (error, alumno) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: alumno
            });
        }
    });
});

module.exports = router; 