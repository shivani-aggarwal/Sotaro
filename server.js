const express = require('express');
const app = express();
const port = 3000;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.redirect('index.html');
});

app.listen(port, () => {
	console.log(`Server listening at port https://localhost:${port}/`);
});
