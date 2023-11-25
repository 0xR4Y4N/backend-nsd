import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import apiRoutes from './routes/api.route.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });


const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.listen(5000, () => {
  console.log('Server listening on port 3000');
});

app.post("/status",(req,res)=>{
  console.log(req.body.access_token)
  return res.json("checking...")
})

app.use('/api', apiRoutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});