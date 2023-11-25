import Topic from '../model/topic.model.js';
import post from '../model/posts.model.js';
import Email from '../model/email.model.js';
import User from '../model/User.model.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { errorHandler } from '../utils/error.js';




// Topic Handler Starts Here
export const addTopic = async (req, res, next) => {
    try{
        const {imageUrl,topicName,clickedCount} = req.body;
        const posts = 0;
        const newPost = new Topic({imageUrl,topicName,clickedCount,posts});
        await newPost.save();
        res.status(201).json({ message: 'Topic Successfully Created.' , post_data:newPost });
    }catch(err){
        next(err);
    }
};

export const deleteTopic = async (req, res, next) => {
    try{
        const topicId = req.params.id;
        const topic = await Topic.findById(topicId);
        if (!topic) {
            return next(errorHandler(404, 'Topic not found.'));
        }
        await Topic.findByIdAndDelete(topicId);
        res.status(201).json({ message: 'Topic Successfully Deleted.' , topic });
    }catch(err){
        next(err);
    }
};

export const updateTopic = async (req, res, next) => {
    try {
        const topicId = req.params.id;
        const { imageUrl, topicName, clickedCount } = req.body;

        const topic = await Topic.findById(topicId);
        if (!topic) {
            return next(errorHandler(404, 'Topic not found.'));
        }

        topic.imageUrl = imageUrl || topic.imageUrl;
        topic.topicName = topicName || topic.topicName;
        topic.clickedCount = clickedCount || topic.clickedCount;

        await topic.save();

        res.status(200).json({ message: 'Topic Successfully Updated.', topic });
    } catch (err) {
        next(err);
    }
};

export const hotTopic = async (req, res, next) => {
    try {
        // Implement your logic to fetch hot topics, for example, sorting by clickedCount.
        const hotTopics = await Topic.find().sort({ clickedCount: -1 }).limit(5);

        res.status(200).json(hotTopics);
    } catch (err) {
        next(err);
    }
};

export const allTopic = async (req, res, next) => {
    try {
        // Fetch all topics
        const allTopics = await Topic.find();

        res.status(200).json(allTopics);
    } catch (err) {
        next(err);
    }
};


export const clickedTopic = async (req, res, next) => {
    try {
        const topicId = req.params.id;

        const topic = await Topic.findById(topicId);
        if (!topic) {
            return next(errorHandler(404, 'Topic not found.'));
        }

        // Increment the clickedCount for the topic
        topic.clickedCount += 1;
        
        await topic.save();

        res.status(200).json({ message: 'Topic Clicked Successfully.', topic });
    } catch (err) {
        next(err);
    }
};

export const addPostToTopic = async (req, res, next) => {
    try {
        const topicId = req.params.id;

        const topic = await Topic.findById(topicId);
        if (!topic) {
            return next(errorHandler(404, 'Topic not found.'));
        }

        // Increment the clickedCount for the topic
        topic.posts += 1;
        
        await topic.save();

        res.status(200).json({ message: 'Topic Added Post Successfully.', topic });
    } catch (err) {
        next(err);
    }
};
// Topic Handler Ends Here


export const addPost = async (req, res, next) => {
    try {
        const { title, shortIntro, author, thumbnail, blog, tags } = req.body;

        const newPost = new post({ title, shortIntro, author, thumbnail, blog, tags });
        await newPost.save();
       
        res.status(201).json({ message: 'Post Successfully Created.', post_data: newPost });
    } catch (err) {
        next(err);
    }
};

export const deletePost = async (req, res, next) => {
    try {
        const postId = req.params.id;

        const postToDelete = await post.findById(postId);
        if (!postToDelete) {
            return next(errorHandler(404, 'Post not found.'));
        }

        await post.findByIdAndDelete(postId);

        res.status(201).json({ message: 'Post Successfully Deleted.', post: postToDelete });
    } catch (err) {
        next(err);
    }
};

export const updatePost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const { title, shortIntro, author, thumbnail, blog, tags } = req.body;

        const postToUpdate = await post.findById(postId);
        if (!postToUpdate) {
            return next(errorHandler(404, 'Post not found.'));
        }

        postToUpdate.title = title || postToUpdate.title;
        postToUpdate.shortIntro = shortIntro || postToUpdate.shortIntro;
        postToUpdate.author = author || postToUpdate.author;
        postToUpdate.thumbnail = thumbnail || postToUpdate.thumbnail;
        postToUpdate.blog = blog || postToUpdate.blog;
        postToUpdate.tags = tags || postToUpdate.tags;

        await postToUpdate.save();

        res.status(200).json({ message: 'Post Successfully Updated.', post: postToUpdate });
    } catch (err) {
        next(err);
    }
};

export const getLatest = async (req, res, next) => {
    try {
        const latestPosts = await post.find().sort({ createdAt: -1 }).limit(5);
        res.status(200).json(latestPosts);
    } catch (err) {
        next(err);
    }
};

export const getPostById = async (req, res, next) => {
    try {
        const postId = req.params.id;
        
        const postToUpdate = await post.findById(postId);
        if (!postToUpdate) {
            return next(errorHandler(404, 'Post not found.'));
        }

        res.status(200).json(postToUpdate);
    } catch (err) {
        next(err);
    }
};

export const getAllByTopic = async (req, res, next) => {
    try {
        const email = req.params.email;

        const email_ = new Email({ email });
        await email_.save();

        res.status(200).json(email_);
    } catch (err) {
        next(err);
    }
};


// email serviceexport 
export const addEmail = async (req, res, next) => {
    try {
        const email = req.params.email;

        const existingEmail = await Email.findOne({ email });

        if (existingEmail) {
            return res.status(400).json("Email already exists");
        }
        const newEmail = new Email({ email }); 
        await newEmail.save();
        res.status(200).json(newEmail);
    } catch (err) {
        next(err);
    }
};

// auth

export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found'));
      if (!validUser.password!=password) return next(errorHandler(401, 'wrong credentials'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // 1 hour
      });
      return res.status(200).json(token);
    } catch (error) {
      next(error);
    }
};