var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var morgan = require('morgan');

const port = 3000;

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});