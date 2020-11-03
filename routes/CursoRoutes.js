const express = require('express');
const router = express.Router();

const Cursos = require('../model/Curso');

router.get('/', (req, res) => {
    Cursos.find({}, (error, cursos) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: cursos
            });
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Cursos.findById(id, (error, curso) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: curso
            });
        }
    });
});

router.post('/', (req, res) => {
    const { nombre, fecha_inicio, fecha_fin, unidades } = req.body;
    Cursos.create({
        nombre,
        fecha_inicio: Date.parse(fecha_inicio),
        fecha_fin: Date.parse(fecha_fin),
        unidades,
    }, (error, curso) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: curso
            });
        }
    });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, fecha_inicio, fecha_fin, unidades } = req.body;
    Cursos.updateOne(id, { // puede que sea necesario que en lugar de id sea {_id: id}
        nombre, 
        fecha_inicio: Date.parse(fecha_inicio), 
        fecha_fin: Date.parse(fecha_fin), 
        unidades, 
    }, {}, (error, curso) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: curso
            });
        }
    });  
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Cursos.deleteOne({_id: id}, (error) => {
        if(error) {
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