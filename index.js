var express = require('express')
var bodyParser = require('body-parser')
var app = express();

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
    res.json({"isbn": req.body.isbn, "count": req.body.count});
    //res.send("ISBN: "+req.body.isbn+"<br>Count: "+req.body.count);
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

app.listen(3000, function () {
  console.log("Example app listening on port " + 3000);
});