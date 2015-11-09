var express = require('express');
var app = express();
var index = require("./routes/index");
var admin = require("./routes/admin");
var bodyParser = require('body-parser');

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.use('/admin', admin);

app.use('/', index);

app.listen(app.get("port"), function(){
    console.log("Listening on port: ", app.get("port"));
});