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
				error,
			});
		} else {
			let alumnos = [];
			// por cada curso...
			cursos.forEach((cur) => {
				if (cur.grupos) {
					// ... revisamos cada grupo (si existen)
					cur.grupos.forEach((gru) => {
						// si existen alumnos
						if (gru.alumnos) {
							// modificamos el objeto para añadirle atributos extra
							const newAlumnos = gru.alumnos.map((alu) => {
								alu.curso = cur.nombre;
								alu.grupo = gru.descripcion;
								return alu;
							});
							alumnos = [...alumnos, ...newAlumnos];
						}
					});
				}
			});
			// eliminamos alumnos repetidos
			let alumnosUnicos = [...new Set(alumnos)];
			res.status(200).json({
				success: true,
				data: alumnosUnicos,
			});
		}
	});
});

router.get('/uniques', (req, res) => {
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

			let alumnos = [];
			// por cada curso...
			cursos.forEach((cur) => {
				if (cur.grupos) {
					// ... revisamos cada grupo (si existen)
					cur.grupos.forEach((gru) => {
						// si existen alumnos
						if (gru.alumnos) {
							// modificamos el objeto para añadirle atributos extra
							gru.alumnos.forEach(alu => {
								alumnos.push(alu.nombre);
							});
						}
					});
				}
			});

			// eliminamos alumnos repetidos
			let alumnosUnicos = [...new Set(alumnos)];

			res.status(200).json({
				success: true,
				data: alumnosUnicos,
			});
		}
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Cursos.find({ 'grupos.alumnos._id': id }, (error, cursos) => {
		if (error) {
			res.status(400).json({
				success: false,
				error,
			});
		} else {
			let [curso] = cursos;
			let alumno;
			let i = 0;
			// mientras no se haya encontrad y el contador i esté iterando grupos
			while (!alumno && i < curso.grupos.length) {
				// si existen alumnos en el grupo con la posición i
				if (curso.grupos[i].alumnos) {
					// buscamos si en los alumnos de este grupo existe el solicitado
					alumno = curso.grupos[i].alumnos.find(
						(alu) => alu._id.toString() === id
					);
				}
				i++;
			}
			if (alumno) {
				res.status(200).json({
					success: true,
					data: alumno,
				});
			} else {
				res.status(404).json({
					success: false,
					error: `El alumno con el id ${id} no se encuentra registrado.`,
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
			error: `El curso con el id ${curso_id} no se encuentra registrado`,
		});
	}
	const idxGrupo = curso.grupos.findIndex(
		(gru) => gru._id.toString() === grupo_id
	);

	// si no se encontró el grupo
	if (idxGrupo === -1) {
		res.status(404).json({
			success: false,
			error: `El grupo con el id ${curso_id} no se encuentra registrado`,
		});
	}

	curso.grupos[idxGrupo].alumnos.push({
		// SI NO SE GUARDA EL _ID AUTOMATICAMENTE, AÑADIRLO AQUÍ
		nombre,
	});

	Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
		if (curso) {
			res.status(200).json({
				success: true,
				data: curso,
			});
		} else {
			res.status(400).json({
				success: false,
				error,
			});
		}
	});
});

// post a /alumnos/many/
// guardar varios alumnos
router.post('/many', async (req, res) => {
	const { grupo_id, alumnos } = req.body;

	Cursos.find({ 'grupos._id': grupo_id }, (error, cursos) => {
		// console.log('curso', curso);
		// console.log('curso id', curso._id);

		if (error || !cursos) {
			res.status(404).json({
				success: false,
				error,
			});
		} else {
			let [curso] = cursos;
			const { _id: curso_id } = curso;

			const idxGrupo = curso.grupos.findIndex(
				(gru) => gru._id.toString() === grupo_id
			);
			console.log('idxGrupo', idxGrupo);

			// si no se encontró el grupo
			if (idxGrupo === -1) {
				res.status(404).json({
					success: false,
					error: `El grupo con el id ${grupo_id} no se encuentra registrado`,
				});
			}

			// LOS AGREGA, NO VALIDA SI SE LLAMAN IGUAL
			curso.grupos[idxGrupo].alumnos = alumnos.reduce((acc, alu) => {
				acc.push({ nombre: alu });

				return acc;
			}, curso.grupos[idxGrupo].alumnos);

			console.log(
				'curso.grupos.idxblabla despues',
				curso.grupos[idxGrupo]
			);

			Cursos.findOneAndUpdate(
				{ _id: curso_id },
				curso,
				{ new: true },
				(error, curso) => {
					if (curso) {
						let grupo = curso.grupos.find(
							(grupo) => grupo._id.toString() === grupo_id
						);
						res.status(200).json({
							success: true,
							data: grupo,
						});
					} else {
						res.status(400).json({
							success: false,
							error,
						});
					}
				}
			);
		}
	});
});

// router.put('/:id', async (req, res) => {
//     const { id } = req.params;
//     const { nombre } = req.body;

//     Cursos.find({ "grupos.alumnos._id": id }, (error, [curso]) => {
//         const { _id: curso_id } = curso;
//         if (error) {
//             res.status(404).json({
//                 success: false,
//                 error
//             });
//         } else {
//             let actualizado = false;

//             for (let i = 0; i < curso.grupos.length; i++) {
//                 // se verifica que exista el arreglo de grupos y después se comprueba el id
//                 if (curso.grupos && curso.grupos[i]._id.toString() === id) {
//                     curso.grupos[i].descripcion = descripcion;
//                     actualizado = true;
//                 }
//             }

//             Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
//                 if (error) {
//                     res.status(400).json({
//                         success: false,
//                         error
//                     });
//                 } else if (!actualizado) {
//                     res.status(404).json({
//                         success: false,
//                         error: `No se encontró el grupo con el id ${id} del curso ${curso_id}`
//                     });
//                 } else {
//                     res.status(200).json({
//                         success: true,
//                         data: curso
//                     });
//                 }
//             });
//         }
//     });
// });

router.delete('/:id', async (req, res) => {
	const { id } = req.params;

	Cursos.find({ 'grupos._id': id }, (error, cursos) => {

		if (error || !cursos) {
			res.status(404).json({
				success: false,
				error,
			});
		} else {


			let [curso] = cursos;

			const { _id: curso_id } = curso;
			let eliminado = false;
			console.log(curso);

			curso.grupos =
				curso.grupos &&
				curso.grupos.reduce((acc, grupo) => {
					acc.push(
						grupo.alumnos.filter((alumno) => {
							eliminado = true;
							return alumno._id !== id;
						})
					);
					return acc;
				}, []);

			Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
				if (error) {
					res.status(400).json({
						success: false,
						error,
					});
				} else if (!eliminado) {
					res.status(404).json({
						success: false,
						error: `No se encontró el alumno con el id ${id} del curso ${curso_id}`,
					});
				} else {
					res.status(200).json({
						success: true,
						data: curso,
					});
				}
			});
		}
	});
});

module.exports = router;
