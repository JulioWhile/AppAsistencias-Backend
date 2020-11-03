const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Curso = new Schema({
    nombre: String,
    fecha_inicio: Date,
    fecha_fin: Date,
    unidades: Number,
})

module.exports = mongoose.model('cursos', Curso);