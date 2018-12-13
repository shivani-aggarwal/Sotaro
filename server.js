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
	console.log('name', req.body.name);
	console.log('score', req.body.score);
});

app.listen(port, () => {
	console.log(`Server listening at http://localhost:${port}/`);
});
