var express = require('express');
var router = express.Router();
var path = require('path');

var pg = require('pg');
var connectionString = process.env.DATABASE_URL + "?ssl=true" || 'postgres://localhost:5432/wknd_04';

router.post('/data', function(req,res){
    //console.log(req);

    var addedMessage = {
        "name" : req.body.namePost,
        "message" : req.body.messagePost
    };

    pg.connect(connectionString, function (err, client) {

        client.query("INSERT INTO messages (name, message) VALUES ($1, $2) RETURNING id",
            [addedMessage.name, addedMessage.message],
            function(err, result) {
                if(err) {
                    console.log("Error inserting data: ", err);
                    res.send(false);
                }

                res.send(true);
            });

        });
});

// Get all the people information
router.get('/data', function(req,res){
    var results = [];

    //SQL Query > SELECT data from table
    pg.connect(connectionString, function (err, client, done) {
        var query = client.query("SELECT id, name, message FROM messages ORDER BY name ASC");

        // Stream results back one row at a time, push into results array
        query.on('row', function (row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function () {
            client.end();
            return res.json(results);
        });

        // Handle Errors
        if (err) {
            console.log(err);
        }
    });
});

router.get("/admin", function(req,res){
    var file = req.params[0] || "views/admin.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

router.get("/*", function(req,res){
    var file = req.params[0] || "views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;