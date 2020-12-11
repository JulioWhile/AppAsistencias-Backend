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
    Cursos.find({ "_id": id }, (error, cursos) => {
        if (error || !cursos) {
            res.status(400).json({
                success: false,
                error
            });
        } else {
            let [curso] = cursos;
            if (curso && curso.grupos) {
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
                        let array = grupos.reduce(acc => {
                            acc.push([]);
                            return acc;
                        }, []);
                        console.log(`array: ${array}`);
                        let sesiones_curso = sesiones.reduce((acc, sesion) => {
    
                            grupos.forEach((grupo, i) => {
                                if (grupo._id.toString() === sesion.grupo_id) {
                                    console.log(`la sesión es del grupo ${grupo}, en el índice ${i}; el tamaño de acc = ${acc.length}`)
                                    acc[i].push(sesion);
                                    return acc;
                                }
                            });
                            return acc;
                        }, array);
    
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

router.get('/alumno/:nombre', (req, res) => {
    const nombre_alumno = req.params.nombre;
    console.log(`nombre del alumno: ${nombre_alumno}`);
    // PRIMERO BUSCAMOS CURSOS
    Cursos.find({}, (error, cursos) => {
        if (error) {
            res.status(400).json({
                success: false,
                error
            });
        } else if (!cursos || !cursos.length) {
            res.status(404).json({
                success: false,
                error: 'No se encontraron cursos registrados.'
            });
        } else {

            // LUEGO BUSCAMOS LAS SESIONES
            Sesiones.find({}, (error, sesiones) => {
                if (error) {
                    res.status(400).json({
                        success: false,
                        error
                    });
                } else if (!sesiones || !sesiones.length) {
                    res.status(404).json({
                        success: false,
                        error: 'No se encontraron sesiones registradas.'
                    });
                } else {

                    // UNA VEZ TENEMOS QUE HAY CURSOS Y SESIONES //
                    // Obtenemos los cursos en los que está presente el alumno
                    let clases_alumno = []; // {curso_id, curso_nombre, grupo_id, grupo_descripcion, alumno_id, alumno_nombre, sesiones=[]}; 
                    CURSOS: // Por cada curso
                    for (let i = 0; i < cursos.length; i++) {
                        let curi = cursos[i];
                        if (!curi || !curi.grupos) continue CURSOS; // si no es válido, buscamos con el siguiente curso

                        GRUPOS: // Por cada grupo dentro del curso
                        for (let j = 0; j < curi.grupos.length; j++) {
                            let grui = curi.grupos[j];
                            console.log(`grupo: ${grui.descripcion} en el curso: ${curi.nombre}, tiene alumnos: ${grui.alumnos}`); 
                            if (!grui || !grui.alumnos) continue GRUPOS;

                            ALUMNOS: // Por cada alumno dentro del curso
                            for (let k = 0; k < grui.alumnos.length; k++) {
                                let alui = grui.alumnos[k];
                                if (!alui) continue ALUMNOS;

                                if (alui.nombre.toString() === nombre_alumno.toString()) {
                                    let obj_alumno = {
                                        curso_id: curi._id.toString(),
                                        curso_nombre: curi.nombre,
                                        grupo_id: grui._id.toString(),
                                        grupo_descripcion: grui.descripcion,
                                        // alumno_id: id_alumno,
                                        alumno_nombre: nombre_alumno,
                                        sesiones: []
                                    };
                                    clases_alumno.push(obj_alumno);
                                    break GRUPOS;
                                }
                                // {curso_id, curso_nombre, grupo_id, grupo_descripcion, alumno_id, alumno_nombre, sesiones=[]};                        
                            }
                        }
                    }
                    // UNA VEZ YA SE TIENEN LAS CLASES DEL ALUMNO
                    // Validamos que se hayan encontrado cursos: 
                    if (!clases_alumno.length) {
                        res.status(404).json({
                            success: false,
                            error: 'No se encontró al alumno en ningún curso.'
                        });
                    } else {
                        // clases_alumno tiene la info
                        sesiones.forEach((sesion) => {
                            for (let i = 0; i < clases_alumno.length; i++) {
                                if (clases_alumno[i].grupo_id === sesion.grupo_id) {
                                    let alu = sesion.asistencias.find(a => a.nombre_alumno === nombre_alumno);
                                    if (alu) {
                                        clases_alumno[i].sesiones.push({
                                            unidad: sesion.unidad,
                                            fecha: sesion.fecha,
                                            asistio: alu.asistio
                                        });
                                    }
                                    break;
                                }
                            }
                        });
                        res.status(200).json({
                            success: true,
                            data: clases_alumno
                        });
                    }
                }
            });
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