const express = require('express');
const app = express();

let users = [];
let journalEntries = [];
let surveyResponses = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Account already exists' });
  }
  const newUser = { username, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

apiRouter.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  res.json({ message: 'Login successful' });
});

apiRouter.post('/journal', (req, res) => {
  const { title, date, content } = req.body;
  const newEntry = { id: journalEntries.length + 1, title, date, content };
  journalEntries.push(newEntry);
  res.status(201).json({ message: 'Journal entry added successfully' });
});

apiRouter.post('/survey', (req, res) => {
  const { response } = req.body;
  const newResponse = { id: surveyResponses.length + 1, response };
  surveyResponses.push(newResponse);
  res.status(201).json({ message: 'Survey response saved successfully' });
});

apiRouter.get('/users', (_req, res) => {
  res.json(users);
});

apiRouter.get('/journal', (_req, res) => {
  res.json(journalEntries);
});

apiRouter.get('/survey', (_req, res) => {
  res.json(surveyResponses);
});

app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
