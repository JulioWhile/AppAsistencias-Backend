const mongoose = require('mongoose');
const { Schema, ObjectId }= mongoose;

const Curso = new Schema({
    nombre: String,
    fecha_inicio: Date,
    fecha_fin: Date,
    unidades: Number,
    grupos: [
        {
            descripcion: String,
            alumnos: [
                {
                    nombre: String
                }
            ]
        }
    ]
})

module.exports = mongoose.model('cursos', Curso);