const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.post('/submit', function(req, res) {
	const name = req.body.name;
	const score = req.body.score;
	// save info to database
	res.redirect(`http://localhost:3000/leaderboard/${name}/${score}`);
});

app.get('/leaderboard/:name/:score', function(req, res) {
	// send top 4 + info submitted
	console.log('name and score received');
});

app.get('/leaderboard', function(req, res) {
	// send top 5
	console.log('get req received');
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}/`);
});
