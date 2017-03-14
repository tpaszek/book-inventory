var express = require('express');
var bodyParser = require('body-parser');
var middleware = require("./middleware");
module.exports = function(repo){  
    var app = express();
    var routes = require("./routes")(repo);
    app.use(bodyParser.json())

    app.get('/stock', routes.getStock);
    app.get('/stock/:isbn', middleware.logger, routes.getStockCount);
    app.get('/', middleware.logger, routes.helloWorld);
    app.get('/error', middleware.logger, routes.error);
    app.post('/stock', routes.postStock);

    app.use(middleware.notFoundHandler);
    app.use(middleware.errorHandler);

    return app;
};