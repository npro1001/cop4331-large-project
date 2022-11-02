const path = require('path');
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5555;
var cors = require('cors');

var allowedOrigins = ['http://localhost:3000',
                      'https://anthem-cop4331.herokuapp.com'];
 
connectDB();
 
const app = express();
 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
 
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/spotify', require('./routes/spotifyRoutes'));
 
// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
 
  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'client', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}
 
app.use(errorHandler);
 
app.listen(port, () => console.log(`Server started on port ${port}`));