var request = require('supertest');
var app = require("../app");

describe("Book inventory", function(){
    it("post stock should return value", function(done){
        request(app)
            .post('/stock')
            .send({ isbn: "1234", count: 1 })
            .expect("Content-Type", /json/)
            .expect(200, { isbn: "1234", count: 1 }, done);
    });
});