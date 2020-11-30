const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const Sesion = new Schema({
    grupo_id: String,
    unidad: Number,
    fecha: Date,
    asistencias: [{
        alumno_id: String,
        nombre_alumno: String,
        asistio: Boolean
    }]

})

module.exports = mongoose.model('sesiones', Sesion);

/*
const sesiones = [
    {
        '_id': 's01',
        'grupo_id': 'c01g01',
        'fecha': '01-01-2020',
        'asistencias': [
            {
                'alumno_id': 'a01',
                'nombre_alumno': 'Juan',
                'asistio': false,
            }, {
                'alumno_id': 'a04',
                'nombre_alumno': 'Felipe',
                'asistio': true,
            },
        ],
    }, {
        '_id': 's02',
        'grupo_id': 'c02g01',
        'fecha': '01-01-2020',
        'asistencias': [
            {
                'alumno_id': 'a01',
                'nombre_alumno': 'Juan',
                'asistio': true,
            }, {
                'alumno_id': 'a02',
                'nombre_alumno': 'Pedro',
                'asistio': false,
            }, {
                'alumno_id': 'a03',
                'nombre_alumno': 'Carlos',
                'asistio': true,
            },
        ],
    }, {
        '_id': 's03',
        'grupo_id': 'c01g01',
        'fecha': '02-01-2020',
        'asistencias': [
            {
                'alumno_id': 'a01',
                'nombre_alumno': 'Juan',
                'asistio': true,
            }, {
                'alumno_id': 'a04',
                'nombre_alumno': 'Felipe',
                'asistio': true,
            },
        ],
    }, {
        '_id': 's04',
        'grupo_id': 'c02g01',
        'fecha': '02-01-2020',
        'asistencias': [
            {
                'alumno_id': 'a01',
                'nombre_alumno': 'Juan',
                'asistio': true,
            }, {
                'alumno_id': 'a02',
                'nombre_alumno': 'Pedro',
                'asistio': true,
            }, {
                'alumno_id': 'a03',
                'nombre_alumno': 'Carlos',
                'asistio': false,
            },
        ],        
    },
]; 


*/