'use strict';

var express = require('express'),
multer = require('multer'),
fs = require('fs'), // Require file system
app = express(),
base = 'public',
port = 3000,
// Mongo stuff
crud = require('./serverModules/crud'),
url = 'mongodb://localhost:27017/mainDB',
// End Mongo stuff
server;

function callback(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
    }
}

// Connect to DB
crud.connect(url, callback);

// Set base dir of static files
app.use(express.static(base));

// Multer parses multiform data, then we set upload dir
app.use(multer({dest: './uploads/'}));

// Temporary - echos string
app.post('/post', function (req, res) {
    var returnString = '';
    // JSCS console.log(req.body);
    for (var key in req.body) {
        returnString += key + ' : ' + req.body[key] + '<br>';
    }
    res.send(returnString);
});

// Add item to DB
app.post('/create', function (req, res) {
    console.log('CREATE: ' + JSON.stringify(req.body));
    var query = req.body;

    crud.create(query, 'test', function (err, result) {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            // JSCS console.log(result.result);
            res.send(JSON.stringify(result));
        }

    });

});

// Fetch form maker settings
app.post('/settings', function (req, res) {
    var formSettings = 'formSettings'; // DB collection with form settings

    crud.read({}, {_id: 0}, formSettings, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            // JSCS console.log(JSON.stringify(docs));
            res.send(JSON.stringify(docs));
        }
    });
});

// Search
app.post('/search', function (req, res) {
    var searchColl = 'test', // DB collection to search
    query = req.body;

    for (var key in query) {
        if (query[key] instanceof Array) {
            query[key] = {$in: query[key]};
        }
    }

    console.log('query: ' + JSON.stringify(query));

    crud.read(query, {_id: 0}, searchColl, function (err, docs) {
        if (err) {
            res.send(err);
        } else {
            // JSCS res.send('blahhhhh');
            res.send(JSON.stringify(docs));
        }
    });
});

// Start the server
server = app.listen(port, function () {

    var host = server.address().address,
    port = server.address().port;

    console.log('Server listening at http://%s:%s', host, port);
});

