// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const registerUser = async (req, res) => {
//   const { username, email, password } = req.body;

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'Account already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const newUser = new User({ username, email, password: hashedPassword });
//   await newUser.save();

//   res.status(201).json({ message: 'User registered successfully' });
// };

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Account not found' });
//     }
  
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: 'Incorrect password' });
//     }
  
//     const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
  
//     res.json({ token });
//   };
  
//   const getUserProfile = async (req, res) => {
//     const { userId } = req.user; 
  
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: 'Account not found' });
//     }
  
//     res.json({ username: user.username, email: user.email });
//   };
  
//   module.exports = { registerUser, loginUser, getUserProfile };