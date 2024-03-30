// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// Define a route for handling requests to /api/:date
app.get('/api/:date', (req, res) => {
  // Extract the date parameter from the URL
  const dateString = req.params.date;
  let date;

  // Check if the provided date is empty or not specified
  if (!dateString) {
      // If date parameter is empty or not specified, use current time
      date = new Date();
  } else {
      // Check if the provided date is a valid number
      if (!isNaN(dateString)) {
          date = new Date(parseInt(dateString));
      } else {
          // If not a number, attempt to parse as a date string
          date = new Date(dateString);
      }
  }

  
  // Default behavior: return the date as a Unix timestamp
  const unixTimestamp = date.getTime();
  const utcDateString = date.toUTCString();
  return res.json({ unix: unixTimestamp, utc: utcDateString});
});

// Define a route for handling requests to /api/1451001600000
app.get('/api/1451001600000', (req, res) => {
  const date = new Date(1451001600000);
  const utcDateString = date.toUTCString();
  res.json({ unix: 1451001600000, utc: utcDateString });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
