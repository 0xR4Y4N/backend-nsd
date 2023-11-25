import mongoose from 'mongoose';

const dataScheme = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,   
    },
  },
  { timestamps: true }
);

const Email = mongoose.model('email', dataScheme);

export default Email;