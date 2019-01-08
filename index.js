var express = require("express"),
    app     = express();

var todoRoutes = require("./routes/todos");

app.use("/api/todos", todoRoutes);

app.get("/", function(req, res) {
    res.send("Hi, from root route");
});

app.listen(8000, function() {
    console.log("Server running");
});
