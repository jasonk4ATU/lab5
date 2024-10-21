const express = require('express'); // Import Express framework
const app = express(); // Create an instance of Express
const port = 3000; // Define the port for the server
const path = require('path'); // Import path module for handling file paths
const bodyParser = require('body-parser'); // Import body-parser for parsing request bodies

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Route to serve the index HTML file
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'index/index.html')); // Send the index.html file
});

// Route to handle name submission via GET method
app.get('/name', (req, res) => {
    const firstname = req.query.firstname; // Get first name from query parameters
    const lastname = req.query.lastname; // Get last name from query parameters
    res.send(`Hello ${firstname} ${lastname}`); // Respond with a greeting message
});

// Route to handle name submission via POST method
app.post('/name', (req, res) => {
    const firstname = req.body.firstname; // Get first name from the request body
    const lastname = req.body.lastname; // Get last name from the request body
    res.send(`Hello ${firstname} ${lastname}`); // Respond with a greeting message
});

// Route to greet user using URL parameters
app.get('/hello/:firstname/:lastname', (req, res) => {
    const firstname = req.params.firstname; // Get the first name from URL parameters
    const lastname = req.params.lastname; // Get the last name from URL parameters
    res.send(`Hello ${firstname} ${lastname}`); // Respond with a greeting message
});

// Route to handle name query parameters
app.get('/name', (req, res) => {
    const firstname = req.query.firstname; // Get first name from query parameters
    const lastname = req.query.lastname; // Get last name from query parameters
    res.send(`Hello ${firstname} ${lastname}`); // Respond with a greeting message
});

// Route to serve a list of movies as JSON
app.get('/api/movies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://example.com/poster1.jpg"
        },
        {
            "Title": "Captain America: Civil War",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://example.com/poster2.jpg"
        },
        {
            "Title": "World War Z",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://example.com/poster3.jpg"
        }
    ];
    res.status(201).json({ myMovies }); // Respond with a JSON object containing the movie list
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`); // Log a success message
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).send('Something went wrong!'); // Send a 500 error response
});
