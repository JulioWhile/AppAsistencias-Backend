const express = require('express');
const router = express.Router();

const Asistencias = require('../model/Asistencia');

router.get('/', (req, res) => {
    Asistencia.find({}, (error, asistencias) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: asistencias
            });
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Asistencia.findById(id, (error, asistencia) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: asistencia
            });
        }
    });
});


router.post('/', (req, res) => {
    const curso = req.body;
    Asistencia.create(curso, (error, asistencia_nueva) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: asistencia_nueva
            });
        }
    });
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const asistencia = req.body;
    Asistencia.updateOne({ _id: id }, asistencia, {}, (error, asistencia_actualizada) => {
        if (curso) {
            res.status(200).json({
                success: true,
                data: asistencia_actualizada
            });
        } else {
            res.status(400).json({
                success: false,
                error
            })
        }
    });
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Asistencia.deleteOne({ _id: id }, (error) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            });
        } else {
            res.status(200).json({
                success: true
            })
        }
    });
});

module.exports = router; 