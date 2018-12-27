const express = require('express');
const bodyParser = require('body-parser');
const Leaderboard = require('./models/Leaderboard.js');

const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.post('/submit', function(req, res) {
	const newEntry = new Leaderboard({
		name: req.body.name,
		score: req.body.score,
	});
	newEntry.save((err, room) => {
		if (err) {
			console.log('Error saving entry to database');
		}
		else {
			res.redirect(`http://localhost:3000/leaderboard/${room._id}`);
		}
	});
});

app.get('/leaderboard/:id', function(req, res) {
	console.log(req.params.id);
	// TODO: send top 4 + entry submitted
	// Leaderboard
	// 	.find({})
	// 	.sort({score: -1})
	// 	.limit(4)
	// 	.then((entries) => {
	// 		console.log(entries)
	// 	})
	// 	.catch((err) => {
	// 		console.log('Error finding entries')
	// 	});
	// Leaderboard
	// 	.findById(req.params.id)
	// 	.then((entry) => {
	// 		console.log(entry)
	// 	})
	// 	.catch((err) => {
	// 		console.log('Error finding entry saved')
	// 	});
});

app.get('/leaderboard', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Leaderboard
		.find({})
		.sort({score: -1})
		.limit(5)
		.then((entries) => {
			console.log('Top 5 entries: ' + entries),
			res.send(200, JSON.stringify( 
				entries.map((entry) => {
					return { name: entry.name, score: entry.score }
				})
			));
		})
		.catch((err) => {
			console.log('Error finding entries')
			res.sendStatus(404);
		});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}/`);
});
