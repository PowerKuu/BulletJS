// Create express app and host public folder
const express = require('express');
const app = express();
const path = require('path');

// Set the port to listen on
const port = process.env.PORT || 3000;

// Set the public folder to host static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(port, () => {console.log("Server is running on port " + port)})