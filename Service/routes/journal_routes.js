// const express = require('express');
// const router = express.Router();
// const fs = require('fs');
// const path = require('path');

// const journalEntriesFilePath = path.join(__dirname, '..', 'data', 'journalEntries.json');

// router.get('/', (req, res) => {
//   fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to read journal entries' });
//     }
//     res.json(JSON.parse(data));
//   });
// });

// router.get('/:id', (req, res) => {
//   const { id } = req.params;

//   fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to read journal entries' });
//     }

//     const entries = JSON.parse(data);
//     const entry = entries[id];

//     if (!entry) {
//       return res.status(404).json({ message: 'Journal entry not found' });
//     }

//     res.json(entry);
//   });
// });

// router.post('/', (req, res) => {
//   const { title, content } = req.body;
//   const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

//   const newEntry = {
//     title,
//     date,
//     content,
//   };

//   fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to read journal entries' });
//     }

//     const entries = JSON.parse(data);
//     entries.push(newEntry);

//     fs.writeFile(journalEntriesFilePath, JSON.stringify(entries, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to save journal entry' });
//       }
//       res.status(201).json(newEntry);
//     });
//   });
// });

// router.put('/:id', (req, res) => {
//   const { id } = req.params;
//   const { title, content } = req.body;

//   fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to read journal entries' });
//     }

//     const entries = JSON.parse(data);
//     const entry = entries[id];

//     if (!entry) {
//       return res.status(404).json({ message: 'Journal entry not found' });
//     }

//     entry.title = title;
//     entry.content = content;

//     fs.writeFile(journalEntriesFilePath, JSON.stringify(entries, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to update journal entry' });
//       }
//       res.json(entry);
//     });
//   });
// });

// router.delete('/:id', (req, res) => {
//   const { id } = req.params;

//   fs.readFile(journalEntriesFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ message: 'Failed to read journal entries' });
//     }

//     const entries = JSON.parse(data);
//     if (!entries[id]) {
//       return res.status(404).json({ message: 'Journal entry not found' });
//     }

//     entries.splice(id, 1);

//     fs.writeFile(journalEntriesFilePath, JSON.stringify(entries, null, 2), (err) => {
//       if (err) {
//         return res.status(500).json({ message: 'Failed to delete journal entry' });
//       }
//       res.status(204).send();
//     });
//   });
// });

// module.exports = router;
