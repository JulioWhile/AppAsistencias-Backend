const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Asistencia = new Schema({
    nombre_alumno: String,
    fecha: Date,
    asistio: Boolean
})

module.exports = mongoose.model('asistencias', Asistencia);