var repo = require("./stockRepository");
var app = require("./app")(repo);

app.listen(3000, function () {
  console.log("Example app listening on port " + 3000);
});