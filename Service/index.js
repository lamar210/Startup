const express = require('express');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(express.static('public'));

const usersFilePath = path.join(__dirname, 'data', 'users.json');
const journalEntriesFilePath = path.join(__dirname, 'data', 'journalEntries.json');
const surveyResponsesFilePath = path.join(__dirname, 'data', 'surveyResponses.json');

// User Registration and Login Services
const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read users' });
    }
    const users = JSON.parse(data);
    if (users.some(user => user.email === email)) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to hash password' });
      }
      const newUser = { username, email, password: hashedPassword };
      users.push(newUser);
      fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ message: 'Failed to save user' });
        }
        res.status(201).json({ message: 'User registered' });
      });
    });
  });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read users' });
    }
    const users = JSON.parse(data);
    const user = users.find(user => user.email === email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ message: 'Error comparing passwords' });
      }
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ email: user.email }, 'secret', { expiresIn: '1h' });
      res.json({ message: 'Login successful', token });
    });
  });
};

// Journal Services

const createJournalEntry = (req, res) => {
  const { userId, content } = req.body;
  const newEntry = { userId, content, date: new Date().toLocaleDateString() };
  fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read journal entries' });
    }
    const entries = JSON.parse(data);
    entries.push(newEntry);
    fs.writeFile(journalEntriesFilePath, JSON.stringify(entries, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save journal entry' });
      }
      res.status(201).json(newEntry);
    });
  });
};

const getJournalEntries = (req, res) => {
  fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read journal entries' });
    }
    res.json(JSON.parse(data));
  });
};

const getJournalEntryByUserId = (req, res) => {
  const { userId } = req.params;
  fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read journal entries' });
    }
    const entries = JSON.parse(data);
    const userEntries = entries.filter(entry => entry.userId === userId);
    res.json(userEntries);
  });
};

// Survey Services

const getAllSurveyResponses = (req, res) => {
  fs.readFile(surveyResponsesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read survey responses' });
    }
    res.json(JSON.parse(data));
  });
};

const submitSurveyResponse = (req, res) => {
  const { userId, mood, triggers, habits } = req.body;
  const newResponse = { userId, mood, triggers, habits, date: new Date().toLocaleDateString() };
  fs.readFile(surveyResponsesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read survey responses' });
    }
    const responses = JSON.parse(data);
    responses.push(newResponse);
    fs.writeFile(surveyResponsesFilePath, JSON.stringify(responses, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save survey response' });
      }
      res.status(201).json(newResponse);
    });
  });
};

const getSurveyResponseByUserId = (req, res) => {
  const { userId } = req.params;
  fs.readFile(surveyResponsesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read survey responses' });
    }
    const responses = JSON.parse(data);
    const userResponse = responses.find(response => response.userId === userId);
    if (!userResponse) {
      return res.status(404).json({ message: 'Survey response not found' });
    }
    res.json(userResponse);
  });
};

const updateSurveyResponse = (req, res) => {
  const { userId } = req.params;
  const { mood, triggers, habits } = req.body;
  fs.readFile(surveyResponsesFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to read survey responses' });
    }
    const responses = JSON.parse(data);
    const userResponse = responses.find(response => response.userId === userId);
    if (!userResponse) {
      return res.status(404).json({ message: 'Survey response not found' });
    }

    userResponse.mood = mood || userResponse.mood;
    userResponse.triggers = triggers || userResponse.triggers;
    userResponse.habits = habits || userResponse.habits;

    fs.writeFile(surveyResponsesFilePath, JSON.stringify(responses, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ message: 'Failed to update survey response' });
      }
      res.json(userResponse);
    });
  });
};

// Routes

app.post('/api/register', registerUser);
app.post('/api/login', loginUser);

app.post('/api/journal', createJournalEntry);
app.get('/api/journal', getJournalEntries);
app.get('/api/journal/:userId', getJournalEntryByUserId);

app.post('/api/survey', submitSurveyResponse);
app.get('/api/survey', getAllSurveyResponses);
app.get('/api/survey/:userId', getSurveyResponseByUserId);
app.put('/api/survey/:userId', updateSurveyResponse);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
