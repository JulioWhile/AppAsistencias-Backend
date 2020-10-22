const express = require('express');
const app = express();
const port = 3000;

// Rutas
app.get('/', (req, res) => {
	res.send('Hello World!');
});

// Escuchar al servidor
app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
