const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { mongoUrl } = require('./config/keys');

//Init Express
const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = mongoUrl
// can also be: const db = config.get('mongoURI'); from a json file

// Connect to Mongo
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
  }) // Adding new mongo url parser
  .then(() => console.log(`MongoDB Connected...`))
  .catch(err => console.log(err));

// Use Routes
const items = require('./routes/api/items');
app.use('/api/items', items);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))
// Anything that doesn't match the above, send back index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + 'client/build/index.html'))
})
//Brad Solution: NODE_ENV error in Window: node_env value of 'production' did not match any deployment config file names
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//   });
// }
/* Why set NPM_CONFIG_PRODUCTION=false in package.json?
    the reason for that is because
    to it's not going to run
    the build script if it's not in
    production so we have to set that to
    false just for this script once this is
    done it'll be in production but we have
    to set this flag right here for this to
    work correctly so we want to set th
*/

const port = process.env.PORT || 6000;

app.listen(port, () => console.log(`Server started on port ${port}`));
