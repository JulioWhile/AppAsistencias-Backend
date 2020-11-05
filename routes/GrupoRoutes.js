/*

PUEDE QUE SEA ELIMINADO

*/

// const express = require('express');
// const router = express.Router();
// const ObjectId = require('mongoose').ObjectId; 

// const Cursos = require('../model/Curso');

// // router.get('/', (req, res) => {
// //     Cursos.find({"": }, (error, grupos) => {
// //         if (error) {
// //             res.status(400).json({
// //                 success: false,
// //                 error
// //             })
// //         } else {
// //             res.status(200).json({
// //                 success: true,
// //                 data: grupos
// //             });
// //         }
// //     });
// // });

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     Cursos.find({ "grupos._id": id }, (error, curso) => {
//         if (error) {
//             res.status(400).json({
//                 success: false,
//                 error
//             })
//         } else {
//             const grupo = curso.grupos.find(g => g._id === id)[0];
//             res.status(200).json({
//                 success: true,
//                 data: grupo
//             });
//         }
//     });
// });

// router.post('/', async (req, res) => {
//     const { curso_id, descripcion } = req.body;
//     const curso = await Cursos.findById(curso_id);
//     if (!curso) {
//         res.status(404).json({
//             success: false,
//             error: 'El id del curso no se encuentra registrado'
//         }); 
//     }

//     curso.grupos.push({
//         _id: Object(), 
//         descripcion
//     })

//     Cursos.updateOne({ _id: curso_id }, curso, {}, (error, curso) => {
//         if (curso) {
//             res.status(200).json({
//                 success: true,
//                 data: curso
//             });
//         } else {
//             res.status(400).json({
//                 success: false,
//                 error
//             })
//         }
//     });
// });


// router.put('/:id', (req, res) => {
//     const { id } = req.params;
//     const { descripcion } = req.body;
    
//     Cursos.find({ "grupos._id": id }, (error, curso) => {
//         if (error) {
//             res.status(400).json({
//                 success: false,
//                 error
//             })
//         } else {
//             const grupo = curso.grupos.find(g => g._id === id)[0];
//             grupo.descripcion = descripcion; 
            


//             res.status(200).json({
//                 success: true,
//                 data: grupo
//             });
//         }
//     });
    
    
    
//     Grupos.updateOne(id, { // puede que sea necesario que en lugar de id sea {_id: id}
//         dias,
//         hora,
//     }, {}, (error, grupo) => {
//         if (error) {
//             res.status(400).json({
//                 success: false,
//                 error
//             })
//         } else {
//             res.status(200).json({
//                 success: true,
//                 data: grupo
//             });
//         }
//     });
// });

// router.delete('/:id', (req, res) => {
//     const { id } = req.params;
//     Grupos.deleteOne({ _id: id }, (error) => {
//         if (error) {
//             res.status(400).json({
//                 success: false,
//                 error
//             });
//         } else {
//             res.status(200).json({
//                 success: true
//             })
//         }
//     });
// });

// module.exports = router; 