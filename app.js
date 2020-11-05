const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const { url: dbURL } = require('./db');


// añadir credenciales con db en la cadena
mongoose.connect(`${dbURL}`, { useNewUrlParser: true })
    .then(db => {
        console.log("Conectado a la base de datos.");
    })
    .catch(err => {
        console.log("Error en la conexión: " + err);
    });

// configuraciones
app.set('port', process.env.PORT || 3000);

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Rutas
app.get('/', (req, res) => {
	res.json('Hello World!');
});

// Rutas cursos:
const cursosRoutes = require('./routes/CursoRoutes');
app.use('/cursos', cursosRoutes);

// rutas asistencias: 
const asistenciasRoutes = require('./routes/AsistenciaRoutes');
app.use('/asistencias', asistenciasRoutes);

// ESTO PUEDE QUE SEA BORRADO EN EL FUTURO //
// // Rutas alumnos:
// // const alumnosRoutes = require('./routes/AlumnoRoutes');
// // app.use('/alumnos', alumnosRoutes);

// ESTO PUEDE QUE SEA BORRADO EN EL FUTURO //
// // Rutas grupos:
// // const gruposRoutes = require('./routes/GrupoRoutes');
// // app.use('/grupos', gruposRoutes);


// Escuchar al servidor
const port = app.get('port');

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});
