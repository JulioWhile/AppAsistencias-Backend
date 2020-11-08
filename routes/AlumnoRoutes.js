const express = require('express');
const { set } = require('mongoose');
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
            let alumnos = []; //add, delete, has, clear, size
            // por cada curso...
            cursos.forEach(cur => {
                if (cur.grupos) {
                    // ... revisamos cada grupo (si existen)
                    cur.grupos.forEach(gru => {
                        // si existen alumnos
                        if (gru.alumnos) {
                            // modificamos el objeto para añadirle atributos extra
                            const newAlumnos = gru.alumnos.map(alu => {
                                alu.curso = cur.nombre;
                                alu.grupo = gru.descripcion;
                            });
                            alumnos = [...alumnos, ...newAlumnos];
                        }
                    });
                }
            })
            // eliminamos alumnos repetidos
            let alumnosUnicos = [...new Set(alumnos)];
            res.status(200).json({
                success: true,
                data: alumnosUnicos
            });
        }
    });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    Cursos.find({ "grupos.alumnos._id": id }, (error, curso) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {

            let alumno;
            let i = 0;
            // mientras no se haya encontrad y el contador i esté iterando grupos
            while (!alumno && i < curso.grupos.length) {
                // si existen alumnos en el grupo con la posición i
                if (curso.grupos[i].alumnos) {
                    // buscamos si en los alumnos de este grupo existe el solicitado 
                    alumno = curso.grupos[i].alumnos.find(alu => alu._id === id);
                }
                i++;
            }
            if (alumno) {
                res.status(200).json({
                    success: true,
                    data: alumno
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: `El alumno con el id ${id} no se encuentra registrado.`
                });
            }
        }
    });
});

router.post('/', async (req, res) => {
    const { curso_id, grupo_id, nombre } = req.body;
    const curso = await Cursos.findById(curso_id);
    if (!curso) {
        res.status(404).json({
            success: false,
            error: `El curso con el id ${curso_id} no se encuentra registrado`
        });
    }
    const idxGrupo = curso.grupos.findIndex(gru => gru._id === grupo_id);

    // si no se encontró el grupo
    if (idxGrupo === -1) {
        res.status(404).json({
            success: false,
            error: `El grupo con el id ${curso_id} no se encuentra registrado`
        });
    }

    curso.grupos[idxGrupo].alumnos.push({
        // SI NO SE GUARDA EL _ID AUTOMATICAMENTE, AÑADIRLO AQUÍ
        nombre,
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

/* 

FALTA POR HACER EL PUT Y EL DELETE

Lo de abajo es lo mismo que está en GrupoRoutes.js

*/

// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { curso_id, descripcion } = req.body;
//     const curso = await Cursos.findById(curso_id);

//     if (!curso) {
//         res.status(404).json({
//             success: false,
//             error: 'El id del curso no se encuentra registrado'
//         });
//     }
//     let actualizado = false;

//     for (let i = 0; i < curso.grupos.length; i++) {
//         // se verifica que exista el arreglo de grupos y después se comprueba el id
//         if (curso.grupos && curso.grupos[i]._id === id) {
//             curso.grupos[i].descripcion = descripcion;
//             actualizado = true;
//         }
//     }

//     Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
//         if (error) {
//             res.status(400).json({
//                 success: false,
//                 error
//             });
//         } else if (!actualizado) {
//             res.status(404).json({
//                 success: false,
//                 error: `No se encontró el grupo con el id ${id} del curso ${curso_id}`
//             });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 data: curso
//             });
//         }
//     });
// });


// router.delete('/:id', (req, res) => {
//     const { curso_id } = req.body;
//     const { id } = req.params;

//     const curso = await Cursos.findById(curso_id);
//     const eliminado = false;

//     for (let i = 0; i < curso.grupos; i++) {
//         if (curso.grupos && curso.grupos[i] === id) {
//             curso.grupos.splice(i, 1);
//             eliminado = true;
//         }
//     }

//     Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
//         if (error) {
//             res.status(400).json({
//                 success: false,
//                 error
//             });
//         } else if (!eliminado) {
//             res.status(404).json({
//                 success: false,
//                 error: `No se encontró el grupo con el id ${id} del curso ${curso_id}`
//             });
//         } else {
//             res.status(200).json({
//                 success: true,
//                 data: curso
//             });
//         }
//     });
// });

// module.exports = router; 