const mongoose = require('mongoose');
const { Schema, ObjectId } = mongoose;

const Curso = new Schema({
    nombre: String,
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
/*

const cursos = [
    {
        '_id': 'c01',
        'nombre': 'Inteligencia Artificial',
        'fecha_inicio': 'enero/2020',
        'fecha_fin': 'mayo/2020',
        'unidades: 5,
        'grupos': [
            {
                '_id': 'c01g01',
                'descripcion': 'MaJu 3:00pm',
                'alumnos': [
                    {
                        '_id': 'a01',
                        'nombre': 'Juan',
                    }, {
                        '_id': 'a04',
                        'nombre': 'Felipe',
                    },
                ],
            },
        ],
    }, {
        '_id': 'c02',
        'nombre': 'Metodologias Agiles de Desarrollo',
        'fecha_inicio': 'enero/2020',
        'fecha_fin': 'mayo/2020',
        'unidades: 4,
        'grupos': [
            {
                '_id': 'c02g01',
                'descripcion': 'MaJu 11:30am',
                'alumnos': [
                    {
                        '_id': 'a01',
                        'nombre': 'Juan',
                    }, {
                        '_id': 'a02',
                        'nombre_alumno': 'Pedro',
                    }, {
                        '_id': 'a03',
                        'nombre_alumno': 'Carlos',
                    },
                ],
            },
        ],
    },
];

*/