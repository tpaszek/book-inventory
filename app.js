var express = require('express')
var bodyParser = require('body-parser')
var app = express();
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/book-inventory';
MongoClient.connect(url, function(err, db) {
  console.log("Connected successfully to server");

  db.close();
});

app.use(bodyParser.json())
function logger (req, res, next) {
    console.log("incomming GET request at auth", new Date());
    next();
};

function notFound(req, res, next){
    var err = new Error("Not found");
    err.status = 404;
    next(err);
};

function errorHandler(err, req, res, next){
    console.error(err.stack);
    var status = err.status || 500;
    res.status(status).send("Status: "+status +"<br>" + err.message);
};

function postStock(req, res){
    MongoClient.connect(url, function(err, db) {
        console.log("Connected successfully to server");
        db.collection('books').updateOne({ isbn:req.body.isbn }, req.body, {upsert: true}, function(err, book){
            db.collection('books').findOne({isbn: req.body.isbn}, function(err, book){
                console.log("Book found")
                res.json(book);
                db.close();
            })
        });
    });
}

app.get('/', logger, function (req, res) {
    res.send("Hello World!");
});

app.get('/error', logger, function (req, res) {
    throw new Error("Something broke very badly");
});

app.post('/stock', postStock);

app.use(notFound);
app.use(errorHandler);

module.exports = app;