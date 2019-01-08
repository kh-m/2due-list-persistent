var express = require("express"),
    app     = express();


app.get("/", function(req, res) {
    res.send("Hi");
});


app.listen(8000, function() {
    console.log("Server running");
});
