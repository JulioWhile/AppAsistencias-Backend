const express = require('express');
const router = express.Router();

const Sesiones = require('../model/Sesion');

router.get('/', (req, res) => {
    Sesiones.find({}, (error, sesiones) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: sesiones
            });
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Sesiones.findById(id, (error, sesion) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            if(curso){
                res.status(200).json({
                    success: true,
                    data: {curso}
                });
            }else{
                res.status(404).json({
                    success: false,
                    error: `La sesión con el id ${id} no se encuentra registrada`
                })
            }
        }
    });
});


router.post('/', (req, res) => {
    const sesion = req.body;
    Sesion.create(sesion, (error, sesion_nueva) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: sesion_nueva
            });
        }
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const sesion = req.body;
    Sesiones.updateOne({ _id: id }, sesion, (error, sesion_actualizada) => {
        if (sesion) {
            res.status(200).json({
                success: true,
                data: sesion_actualizada
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
    Sesiones.deleteOne({ _id: id }, (error) => {
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