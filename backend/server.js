const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

//calls connectDB: connects to our database
connectDB();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//User Routes
app.use('/api/users', require('./routes/userRoutes'));

//Issue Routes
app.use('/api/issues', require('./routes/issueRoutes'));

//Serve frontend
if (process.env.NODE_ENV === 'production') {
  //set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index/html')
  );
} else {
  app.get('/', (req, res) => {
    res.json({ message: 'Welcome to BugTracker API' });
  });
}

//error handler middleware
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`server started on ${process.env.NODE_ENV}, on port ${PORT}`);
});
