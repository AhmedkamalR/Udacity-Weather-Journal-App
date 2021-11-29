const express = require('express');
const bodyParser = require('body-parser');

const app = express();

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

let projectData = {};
const addInfo = (req, res) => {
  projectData['temp'] = req.body.temp;
  projectData['date'] = req.body.date;
  projectData['content'] = req.body.content;
  res.send(projectData);
};

const getInfo = (req, res) => res.send(projectData);

// route
app.get('/all', getInfo);
app.post('/add', addInfo);

const port = 8000; // port
app.listen(port, () => console.log(`server is listening on port: ${port}`));
