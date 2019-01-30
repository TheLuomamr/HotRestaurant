// 1) Create a basic server using Express.JS

// Dependencies
var express = require("express");
var path = require("path");

// Sets up the Express App
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Starts the server to begin listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});  

// =============================================================

// 2) Create a few array variables that will hold the data

var reservations = [
    {
        id: "",
        name: "",
        phone: "",
        email: ""
    }
]


// =============================================================

// 3) Create a set of routes for getting and posting table data

// Create New Reservations - takes in JSON input
app.post("/api/reservations", function(req, res) {
// req.body hosts is equal to the JSON post sent from the user
// This works because of our body parsing middleware
var newReservation = req.body;

// Using a RegEx Pattern to remove spaces from newCharacter
// You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
newReservation = newReservation.name.replace(/\s+/g, "").toLowerCase();

console.log(newReservation);

reservations.push(newReservation);

res.json(newReservation);
});

// =============================================================

// 4) Create a set of routes for displaying the HTML pages

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});
  
app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tableView.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reservation.html"));
});

// Displays all reservations including wait list
app.get("/api/reservations", function(req, res) {
    return res.json(reservations);
});

for(let index of reservations){

    if(index > 4){
        // Displays all waitlist
        app.get("/api/waitlist", function(req, res) {
        return res.json(reservations);
        });
    }
    
}


// =============================================================

// 5) Use jQuery to run AJAX calls to GET and POST data from users to the Express server

