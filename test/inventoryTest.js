var request = require('supertest');
var appFactory = require("../src/app");

describe("Book inventory", function(){
    it("post stock should return value", function(done){
        var repo = require("./inmemoryRepository")();
        var app = appFactory(repo);
        request(app)
            .post('/stock')
            .send({ isbn: "1234", count: 1 })
            .expect("Content-Type", /json/)
            .expect(200, { isbn: "1234", count: 1 }, done);
    });

    it("get stock should return proper value", function(done){
        var repo = require("./inmemoryRepository")();
        var app = appFactory(repo);
        repo._items([{isbn: "123456", count: 10 }]);
        request(app)
            .get('/stock/123456')
            .expect("Content-Type", /json/)
            .expect(200, { count: 10 }, done);
    });
});