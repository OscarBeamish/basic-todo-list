// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors middleware

// Create Express application
const app = express();

// Middleware to parse JSON request bodies
app.use(bodyParser.json());

// Define MongoDB connection
mongoose.connect('mongodb://127.0.0.1/todo-list-app', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check MongoDB connection status
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define Todo model/schema
const Todo = mongoose.model('Todo', {
    title: String,
    completed: Boolean
});

// Add CORS middleware to allow requests from all origins
app.use(cors());

// Route to handle POST requests to "/api/todos"
app.post('/api/todos', async (req, res) => {
    try {
        // Create a new todo item based on the request body
        const newTodo = new Todo({
            title: req.body.title,
            completed: req.body.completed || false // Default to false if not provided
        });

        // Save the new todo item to the database
        const savedTodo = await newTodo.save();

        // Send a success response with the saved todo item
        res.status(201).json(savedTodo);
    } catch (err) {
        // If there's an error, send an error response
        console.error('Error saving todo:', err);
        res.status(500).send('Internal Server Error');
    }
});

// Route to handle GET requests to "/api/todos"
app.get('/api/todos', async (req, res) => {
  try {
      // Fetch all todos from the database
      const todos = await Todo.find();

      // Send a success response with the fetched todos
      res.status(200).json(todos);
  } catch (err) {
      // If there's an error, send an error response
      console.error('Error fetching todos:', err);
      res.status(500).send('Internal Server Error');
  }
});

// Route to handle DELETE requests to "/api/todos/:id"
app.delete('/api/todos/:id', async (req, res) => {
  try {
      const todoId = req.params.id;

      // Find the todo item by ID and delete it from the database
      await Todo.findByIdAndDelete(todoId);

      // Send a success response
      res.status(204).send();
  } catch (err) {
      // If there's an error, send an error response
      console.error('Error deleting todo:', err);
      res.status(500).send('Internal Server Error');
  }
});


// Start the server and listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
