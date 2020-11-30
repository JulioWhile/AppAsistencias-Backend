const express = require('express');
const router = express.Router();

const Sesiones = require('../model/Sesion');
const Cursos = require('../model/Curso'); // utilizado para hacer la consulta de sesiones por curso


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
            if (sesion) {
                res.status(200).json({
                    success: true,
                    data: { sesion }
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: `La sesión con el id ${id} no se encuentra registrada`
                })
            }
        }
    });
});

router.get('/curso/:id', (req, res) => {
    const { id } = req.params;
    Cursos.find({ "_id": id }, (error, [ curso ] ) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            });
        } else if (curso && curso.grupos) {
            const grupos = curso.grupos;

            Sesiones.find({}, (error, sesiones) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                        error
                    })
                } else if (sesiones) {

                    // let sesiones_curso = sesiones.filter( sesion => {
                    //     grupos.forEach( (grupo) => {
                    //         if(grupo._id.toString() === sesion.grupo_id) {
                    //             return true; 
                    //         }
                    //     });
                    //     return false; 
                    // })

                    // con reduce, puede que no sea necesario
                    // la diferencia con la anterior búsqueda, es que en esta se retorna un arreglo por grupos 
                    let sesiones_curso = sesiones.reduce((acc, sesion) => {
                        grupos.forEach((grupo, i) =>{
                            if(grupo._id.toString() === sesion.grupo_id) {
                                acc[i].push(sesion); 
                                return acc; 
                            }
                        })
                    }, Array(grupos.length).fill([])); 

                    res.status(200).json({
                        success: true,
                        data: sesiones_curso
                    });
                } else {
                    res.status(404).json({
                        success: false,
                        error: `No se encontraron sesiones`
                    });
                }
            });
        } else {
            res.status(404).json({
                success: false,
                error: `No se encontró el curso`
            });
        }
    });
});

router.get('/grupo/:id', (req, res) => {
    const { id: grupo_id } = req.params;
    Sesiones.find({}, (error, sesiones) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            })
        } else {
            if (sesiones) {
                console.log(`sesiones: ${sesiones}`); 
                let sesionesFiltradas = sesiones.filter(ses => {
                    return ses.grupo_id.toString() === grupo_id
                });
                console.log(`sesionesFiltradas: ${sesionesFiltradas}`); 
                res.status(200).json({
                    success: true,
                    data: sesionesFiltradas
                });
            } else {
                res.status(404).json({
                    success: false,
                    error: `No se encontraron sesiones`
                })
            }
        }
    });
});

router.post('/', (req, res) => {
    const { sesion } = req.body;

    Sesiones.create(sesion, (error, sesion_nueva) => {
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
    const { sesion: { fecha, unidad, asistencias } } = req.body;

    Sesiones.findById(id, (error, sesion) => {
        if (error) {
            res.status(404).json({
                success: false,
                error
            });
        } else {
            sesion.fecha = fecha;
            sesion.unidad = unidad; 
            sesion.asistencias = asistencias;

            Sesiones.updateOne({ _id: curso_id }, sesion, {}, (error, sesion) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                        error
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        data: sesion
                    });
                }
            });
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