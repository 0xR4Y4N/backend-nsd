import mongoose from 'mongoose';

const dataScheme = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,   
    },
    topicName: {
        type: String,
        required: true,   
    },
    clickedCount:{
        type:Number,
        required:false
    },
    posts:{
      type:Number,
      required:false
    }
  },
  { timestamps: true }
);

const Topic = mongoose.model('topic', dataScheme);

export default Topic;