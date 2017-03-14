module.exports = function() {
    var items = [];

    return {
        _items: function(state) {
            items = state;
        },
        stockUp: function (isbn, count) {
            var updated = false;
            var foundItem;
            items.forEach(function(item) {
                if(item.isbn === isbn) {
                    item.count = count;
                    foundItem = item;
                    updated = true;
                }
            });
            if(!updated) {
                foundItem = {"isbn": isbn, "count": count};
                items.push(foundItem);
            }
            return Promise.resolve(foundItem);
        },
        findAll: function () {
            return Promise.resolve(items);
        },
        getCount: function (isbn) {
            var foundItemCount = null;
            items.forEach(function(item) {
                if(item.isbn === isbn) {
                    foundItemCount = item.count;
                }
            });
            return Promise.resolve(foundItemCount);
        }
    };
};