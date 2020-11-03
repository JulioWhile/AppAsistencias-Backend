const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Grupo = new Schema({
	dias: String,
	hora: String, // identificador, "nombre" de grupo (no hace falta evaluar periodos)
});

module.exports = mongoose.model('grupos', Grupo);
