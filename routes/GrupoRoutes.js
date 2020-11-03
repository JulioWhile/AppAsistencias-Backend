const express = require('express');
const router = express.Router();

const Grupos = require('../model/Grupo');

router.get('/', (req, res) => {
    Grupos.find({}, (error, grupos) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: grupos
            });
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Grupos.findById(id, (error, grupo) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: grupo
            });
        }
    });
});

router.post('/', (req, res) => {
    const { dias, hora } = req.body;
    Grupos.create({
        dias,
        hora,
    }, (error, grupo) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: grupo
            });
        }
    });
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { dias, hora } = req.body;
    Grupos.updateOne(id, { // puede que sea necesario que en lugar de id sea {_id: id}
        dias,
        hora,
    }, {}, (error, grupo) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            res.status(200).json({
                success: true,
                data: grupo
            });
        }
    });  
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Grupos.deleteOne({_id: id}, (error) => {
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