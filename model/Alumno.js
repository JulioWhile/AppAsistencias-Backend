const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Alumno = new Schema({
    nombre: String,
    // correo: String // parece que este no lo da el .csv
})

module.exports = mongoose.model('alumnos', Alumno);