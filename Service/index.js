const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.argv.length > 2 ? process.argv[2] : 4000;

const uri = "mongodb+srv://lms210:FKEaaz5vYpKSHHNo@clusterstartup.vp5fu.mongodb.net/?retryWrites=true&w=majority&appName=Clusterstartup";
const client = new MongoClient(uri);
let usersCollection;
let journal_entriesCollection;

async function connectToDB() {
  try {
    await client.connect();
    const database = client.db('PagesOfMe');
    usersCollection = database.collection('users');
    journal_entriesCollection = database.collection('journal_entries'); 
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}
connectToDB();

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

const apiRouter = express.Router();
app.use('/api', apiRouter);

apiRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    user.password = undefined;

    const token = jwt.sign({ userId: user._id, email: user.email }, '26aee579f54dd7c5c93e4cbc455347cd02e466e8cad9c3c4b08e3e976282d020', { expiresIn: '1h' });
    res.json({ message: 'Login successful', user, token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

apiRouter.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Account already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };
    await usersCollection.insertOne(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

apiRouter.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = '66d58455c018da1d26792a5cff863c85';
  
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching weather data' });
  }
});

apiRouter.post('/evaluate-mood-message', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { happiness, stress, energy } = user.moodScores || {};
    let message = '';

    if (stress > happiness) {
      message = "Your moods have been down lately. Reach out to someone you trust or engage in uplifting activities. It's okay to not be okay.";
    } else if (happiness >= stress && happiness >= energy) {
      message = "You're doing great! Keep up healthy habits and continue enjoying activities that bring you joy.";
    } else {
      message = "You're managing okay, but finding balance could help you feel better. Focus on small well-being steps each day.";
    }

    res.json({ message });
  } catch (error) {
    res.status(500).json({ message: 'Error evaluating mood message', error });
  }
});

apiRouter.post('/journal-entries', async (req, res) => {
  const userEmail = req.body.email;
  try {
    const entries = await journal_entriesCollection.find({ email: userEmail }).toArray();
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching journal entries', error });
  }
});

apiRouter.get('/current-user', async (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, '26aee579f54dd7c5c93e4cbc455347cd02e466e8cad9c3c4b08e3e976282d020');
    const user = await usersCollection.findOne({ _id: decoded.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user: { email: user.email, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
