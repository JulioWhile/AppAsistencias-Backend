const db = {
	app_name: 'appasistenciasbackend',
	db_name: 'dbAsistencias',
	user: 'dbUser',
	password: '123qwe',
};
const url = `mongodb+srv://${db.user}:${db.password}@${db.app_name}.gm1sx.mongodb.net/${db.db_name}?retryWrites=true&w=majority`;

module.exports = {db, url}; 