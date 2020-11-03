const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Asistencia = new Schema({
    fecha: Date,
    hora_llegada: String
})

module.exports = mongoose.model('asistencias', Asistencia);