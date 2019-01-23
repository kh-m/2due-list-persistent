var express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

var todoRoutes = require("./routes/todos");

app.use("/api/todos", todoRoutes);

app.get("/", function(req, res) {
    res.sendFile("index.html");
});

// // For running on external server
// app.listen(env.process.PORT, env.process.IP, function() {
//     console.log("Server running");
// })

// For running on local server
app.listen(8000, function() {
    console.log("Server running");
});
