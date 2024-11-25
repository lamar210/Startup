const express = require('express');
const cors = require('cors');
const app = express();

const users = [];
const journalEntries = [];
const surveyResponses = [];

app.use(express.json());
app.use(cors());

// Register Service
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: 'Account already exists' });
  }
  const newUser = { username, email, password };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
});

// Login Service
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((user) => user.email === email && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  res.json({ message: 'Login successful' });
});

// Journal Service
app.post('/api/journal', (req, res) => {
  const { title, date, content } = req.body;
  const newEntry = { id: journalEntries.length + 1, title, date, content };
  journalEntries.push(newEntry); 
  res.status(201).json({ message: 'Journal entry added successfully' });
});

// Survey Service
app.post('/api/survey', (req, res) => {
  const { response } = req.body;
  const newResponse = { id: surveyResponses.length + 1, response };
  surveyResponses.push(newResponse);
  res.status(201).json({ message: 'Survey response saved successfully' });
});

// Routes
app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/api/journal', (req, res) => {
  res.json(journalEntries);
});

app.get('/api/survey', (req, res) => {
  res.json(surveyResponses);
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
