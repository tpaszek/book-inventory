var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/book-inventory';
var collection = MongoClient.connect(url, { bufferMaxEntries: 0 })
    .then(function(db){
        return db.collection("books");
    })
    .catch(function(err){
        console.error(err);
        process.exit(1);
    });

function stockUp(isbn, count){
    return collection.then(function(coll){
        return coll.updateOne({ isbn: isbn }, {isbn: isbn, count: count }, {upsert: true});
    })
    .then(function(){
        return {
            isbn: isbn,
            count: count
        };
    });
}

function find(isbn){
    return collection.then(function(coll){
        return coll.find({isbn: isbn}).limit(1).next();
    });
}

function findAll(){
    return collection.then(function(coll){
        return coll.find({}).toArray();
    });
}

module.exports = {
    stockUp: stockUp,
    findAll: findAll,
    find: find,
    getCount: function(isbn){
        return collection.then(function(coll){
            return coll.find({isbn: isbn}).limit(1).next();
        })
        .then(function(result){
            return result && result.count;
        })
    }
}