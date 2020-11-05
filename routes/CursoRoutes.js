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
    const curso = req.body;
    Cursos.create(curso, (error, curso_nuevo) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: curso_nuevo
            });
        }
    });
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const curso = req.body;
    Cursos.updateOne({ _id: id }, curso, {}, (error, curso_actualizado) => {
        if (curso) {
            res.status(200).json({
                success: true,
                data: curso_actualizado
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
    Cursos.deleteOne({ _id: id }, (error) => {
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