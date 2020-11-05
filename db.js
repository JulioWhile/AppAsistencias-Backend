<<<<<<< HEAD
const db = {
	app_name: 'appasistenciasbackend',
	db_name: 'dbAsistencias',
	user: 'dbUser',
	password: '123qwe',
};
const url = `mongodb+srv://${db.user}:${db.password}@${db.app_name}.gm1sx.mongodb.net/${db.db_name}?retryWrites=true&w=majority`;

module.exports = {db, url}; 
=======
module.exports = {
	//url: 'mongodb://localhost/',
	url:
		'mongodb+srv://dbUser:123qwe@appasistenciasbackend.gm1sx.mongodb.net/dbAgil?retryWrites=true&w=majority',
	name: 'AppAsistenciasBackend',
	user: 'dbUser',
	password: '123qwe',
};
>>>>>>> a4cb92463c3af14f1bd1d532bbe075966e208bab
