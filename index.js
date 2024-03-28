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

app.get('/api/:date?', (req, res) => {
  const dateParam = req.params.date;

  // Handle empty date parameter
  if (!dateParam) {
    const currentDate = new Date();
    return res.json({ unix: currentDate.getTime(), utc: currentDate.toUTCString() });
  }

  // Try to parse the date parameter
  const date = new Date(dateParam);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    return res.status(400).json({ error: 'Invalid Date' });
  }

  // Convert the date to a Unix timestamp in milliseconds
  const unixTimestamp = date.getTime();

  // Format the date in UTC format
  const utcDate = date.toUTCString();

  // Return the JSON response with both Unix timestamp and UTC date
  return res.json({ unix: unixTimestamp, utc: utcDate });
});

app.get('/api/1451001600000', (req, res) => {
  const fixedDate = new Date(1451001600000);
  const utcDate = fixedDate.toUTCString();

  return res.json({ unix: 1451001600000, utc: utcDate });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
