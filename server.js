var request = require('request');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());


app.post('/api/login', function (req, res) {
    if (req.body.username === 'rob') {
        res.send('Login Successful');
    } else {
        res.status(403).send('invalid username or password');
    }
});

app.get('/api/user', function (req, res) {
    res.send({
        username: 'rob',
        preferences: {
            favouriteTypeOfJoke: 'nerdy'
        }
    });
});

app.get('/api/tellAJoke', function (req, res) {
    request('http://api.icndb.com/jokes/random?limitTo=[' + req.query.category + ']', function (error, response, body) {
        res.send(JSON.parse(body).value.joke);
    })
});

app.use(express.static(__dirname + '/src'));

var server = app.listen(process.env.PORT || 3000, function () {
    console.log('Listening on', server.address().port);
});