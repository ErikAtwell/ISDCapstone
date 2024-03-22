// Capstone Express Server
// Erik Atwell

const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3001;

const url = "mongodb+srv://erikatwell12:Erik@cluster1.nw07bnw.mongodb.net/Library?retryWrites=true&w=majority";
const client = new MongoClient(url);

// Reference the database
const dbName = "Library";

app.use(bodyParser.json());

// CORS function
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === "OPTIONS") res.sendStatus(200);
  else next();
});

// Book Schema
const bookSchema = {
  title: String,
  author: String,
  publisher: String,
  ISBN: String,
  status: String,
  checkedOutBy: String,
  dueDate: String
};


// Connect to the Atlas cluster
client.connect()
  .then(() => {
    const db = client.db(dbName);
    const col = db.collection("Books");

    // List available books
    app.get('/available-books', async (req, res) => {
      const availableBooks = await col.find({ status: 'available' }).toArray();
      res.json(availableBooks);
    });

    // List checked-out books
    app.get('/checked-out-books', async (req, res) => {
      const checkedOutBooks = await col.find({ status: 'checked-out' }).toArray();
      res.json(checkedOutBooks);
    });

    // Check out a book
    app.post('/check-out', async (req, res) => {
      const { ISBN, checkedOutBy, dueDate } = req.body;
      const result = await col.updateOne(
        { ISBN, status: 'available' },
        { $set: { status: 'checked-out', checkedOutBy, dueDate } }
      );
      res.json({ success: result.modifiedCount > 0 });
    });

    // Check in a book
    app.post('/check-in', async (req, res) => {
      const { ISBN } = req.body;
      const result = await col.updateOne(
        { ISBN, status: 'checked-out' },
        { $set: { status: 'available', checkedOutBy: '', dueDate: '' } }
      );
      res.json({ success: result.modifiedCount > 0 });
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));