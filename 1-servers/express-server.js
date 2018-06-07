const express = require('express');
const bodyParser = require('body-parser');
const dogs = require('./helpers/dogs.js');

//create server

const app = express();
const PORT = process.env.PORT || 3000;

//add bodyparser middle ware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set the static content
app.use(express.static('public'));

app.get('/api/dogs', (req, res) => {
	dogs.getAll(data => {
		res.type('application/json');
		res.json(data);
	});
});

app.get('/api/dogs/:id', (req, res) => {
	dogs.getOneById(req.params.id, data => {
		if (data) {
			res.json(data);
		} else {
			res.status(404).send('Not found');
		}
	});
});
//non existing routes
app.get('*', (req, res) => {
	res.status(404).send('Not found');
});

app.post('/api/dogs', (req, res) => {
	res.set('Content-Type', 'application/json');
	dogs.addOne(req.body.name, req.body.breed, data => {
		res.json(data);
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on Port ${PORT}`);
});
