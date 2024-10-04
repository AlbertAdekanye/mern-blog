import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';

dotenv.config();


mongoose.connect(process.env.MONGO)
.then(() => {
  console.log('Connected to MongoDB!!');
}).catch(err => {
  console.log('Error connecting to MongoDB!!', err);
});

// const express = require('express');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Your code goes here

app.listen(3000, () => {
  console.log('Server is running on port 3000!!');
});

// create a test API route 
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/post', postRoutes);

// create middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internet Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message
  });
})