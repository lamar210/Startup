const express = require('express'); 
const mongoose = require('mongoose');
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const user_routes = require('./routes/user_routes');
const journal_routes = require('./routes/journal_routes');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', user_routes);
app.use('/api/journal', journal_routes);

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
