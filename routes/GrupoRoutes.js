const express = require('express');
const router = express.Router();
// const ObjectId = require('mongoose').ObjectId;

const Cursos = require('../model/Curso');

router.get('/', (req, res) => {
    Cursos.find({}, (error, cursos) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            let grupos = [];
            // se va creando el arreglo de grupos según cada grupo de los cursos.
            cursos.forEach(cur => {
                if (cur.grupos) {
                    // añadimos el atributo "curso" a cada grupo
                    const newGroups = cur.grupos.map(gr => {
                        // SI SE VAN A JALAR MÁS ATRIBUTOS, METERLOS AQUÍ
                        gr.curso = cur.nombre;
                        return gr;
                    })
                    grupos = [...grupos, ...newGroups];
                }
            })
            res.status(200).json({
                success: true,
                data: grupos
            });
        }
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;

    Cursos.find({ "grupos._id": id }, (error, [curso]) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            const grupo = curso.grupos.find(g => g._id.toString() === id);
            res.status(200).json({
                success: true,
                data: grupo
            });
        }
    });
});

// para obtener los grupos de cierto curso
router.get('/curso/:id', (req, res) => {
    const { id } = req.params;
    Cursos.find({ "_id": id }, (error, [curso]) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            const grupos = curso.grupos;
            res.status(200).json({
                success: true,
                data: grupos
            });
        }
    });
});

router.post('/', async (req, res) => {
    const { curso_id, descripcion } = req.body;
    const curso = await Cursos.findById(curso_id);
    if (!curso) {
        res.status(404).json({
            success: false,
            error: 'El id del curso no se encuentra registrado'
        });
    }

    curso.grupos.push({
        // SI NO SE GUARDA EL _ID AUTOMATICAMENTE, AÑADIRLO AQUÍ
        descripcion
    })

    Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
        if (curso) {
            res.status(200).json({
                success: true,
                data: curso
            });
        } else {
            res.status(400).json({
                success: false,
                error
            })
        }
    });
});


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { descripcion } = req.body;

    Cursos.find({ "grupos._id": id }, (error, [curso]) => {
        const { _id: curso_id } = curso;
        if (error) {
            res.status(404).json({
                success: false,
                error: 'El id del curso no se encuentra registrado'
            });
        } else {
            let actualizado = false;

            for (let i = 0; i < curso.grupos.length; i++) {
                // se verifica que exista el arreglo de grupos y después se comprueba el id
                if (curso.grupos && curso.grupos[i]._id.toString() === id) {
                    curso.grupos[i].descripcion = descripcion;
                    actualizado = true;
                }
            }

            Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                        error
                    });
                } else if (!actualizado) {
                    res.status(404).json({
                        success: false,
                        error: `No se encontró el grupo con el id ${id} del curso ${curso_id}`
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        data: curso
                    });
                }
            });
        }
    });
    // const curso = await Cursos.findById(curso_id);



    // console.log(curso); 
});


router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    Cursos.find({ "grupos._id": id }, (error, [curso]) => {

        const { _id: curso_id } = curso;
        let eliminado = false;
        console.log(curso);
        for (let i = 0; i < curso.grupos.length; i++) {
            if (curso.grupos && curso.grupos[i]._id.toString() === id) {
                curso.grupos.splice(i, 1);
                eliminado = true;
                break; 
            }
        }
        console.log(curso); 

        Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
            if (error) {
                res.status(400).json({
                    success: false,
                    error
                });
            } else if (!eliminado) {
                res.status(404).json({
                    success: false,
                    error: `No se encontró el grupo con el id ${id} del curso ${curso_id}`
                });
            } else {
                res.status(200).json({
                    success: true,
                    data: curso
                });
            }
        });
    });

});

module.exports = router; 