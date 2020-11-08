/* 
    PUEDE QUE ESTE SEA BORRADO Y REEMPLAZADO POR SESIÓN
*/

const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const Asistencia = new Schema({
    alumno_id: ObjectId,
    grupo_id: ObjectId,
    nombre_alumno: String,
    fecha: Date,
    asistio: Boolean
})

module.exports = mongoose.model('asistencias', Asistencia);