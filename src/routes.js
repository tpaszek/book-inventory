module.exports = function(repo){
    return {
        postStock: function(req, res, next){
            repo.stockUp(req.body.isbn, req.body.count)
            .then(function(book){
                res.json(book);
            })
            .catch(next);
        },
        getStock: function(req, res, next){
            repo.findAll()
            .then(function(docs) {
            res.json(docs);
            })
            .catch(next);
        },
        getStockCount: function(req, res, next){
            // repo.find(req.params.isbn)
            // .then(function(doc) {
                // if(doc){
                //     res.json({count: doc.count});
                // }else {
                //     var error = new Error("Item not found");
                //     error.status = 404;
                //     next(error);
                // }
            //})
            //.catch(next);
            
            repo.getCount(req.params.isbn)
            .then(function(result) {
                if(result == null){
                    res.status(404).send("No book with isbn "+req.params.isbn)
                }
                else{
                    res.json({count: result});
                }
            })
            .catch(next);
        },
        error: function (req, res) {
            throw new Error("Something broke very badly");
        },
        helloWorld: function (req, res) {
            res.send("Hello World!");
        }
    };
}