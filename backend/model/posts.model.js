import mongoose from 'mongoose';

const dataScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,   
    },
    shortIntro: {
        type: String,
        required: true,   
    },
    author: {
        type: String,
        required: true,   
    },
    thumbnail: {
        type: String,
        required: true,
    },
    blog: {
        type: String,
        required: true,
    },
    tags: {
        type:  [String],
        default: [],
        required: true,
    }
  },
  { timestamps: true }
);

const post = mongoose.model('posts', dataScheme);

export default post;