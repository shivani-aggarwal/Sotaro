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
			console.log('Error saving entry: ', err);
		}
		else {
			res.redirect(`http://localhost:3000/leaderboard/${room._id}`);
		}
	});
});

app.get('/leaderboard/:id', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Leaderboard
		.find({})
		.sort({score: -1})
		.then((entries) => {
			const index = entries.map(entry => entry._id.toString()).indexOf(req.params.id)
			let topEntries = [];
			if (index > 5) {
				topEntries = entries.slice(0,4).map(entry => {
					return { name: entry.name, score: entry.score };
				})
				topEntries.push({ name: entries[index].name, score: entries[index].score, rank: index+1 })
			}
			else if (index > -1) {
				topEntries = entries.slice(0,index).map(entry => {
					return { name: entry.name, score: entry.score }
				})
				topEntries.push({ name: entries[index].name, score: entries[index].score, rank: index+1 })
				entries.slice(index,6).forEach((entry) => {
					topEntries.push({name: entry.name, score: entry.score})
				})
			}
			res.status(200).send(JSON.stringify(topEntries));
		})
		.catch((err) => {
			console.log('Error: ', err)
		});
});

app.get('/leaderboard', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	Leaderboard
		.find({})
		.sort({score: -1})
		.limit(5)
		.then((entries) => {
			res.status(200).send(JSON.stringify( 
				entries.map(entry => {
					return { name: entry.name, score: entry.score }
				})
			));
		})
		.catch((err) => {
			console.log('Error: ', err)
			res.sendStatus(404);
		});
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}/`);
});
