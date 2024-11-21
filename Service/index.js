const express = require('express'); 
const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const userRoutes = require('./routes/user_routes');
const journalRoutes = require('./routes/journalRoutes');

app.use(express.json());
app.use(express.static('public'));

app.use('/api/users', user_Routes);
app.use('/api/journal', journalRoutes);

app.listen(port, () => {
  console.log(`Server running on port 4000`);
});
