import mongoose from 'mongoose';

const dataScheme = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,   
    },
    password: {
        type: String,
        required: true,   
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', dataScheme);

export default User;