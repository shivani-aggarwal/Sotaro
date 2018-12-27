const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sotaroDB');
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});

let leaderboardSchema = new mongoose.Schema({
	name: String,
	score: Number,
});

module.exports = mongoose.model('Leaderboard', leaderboardSchema);