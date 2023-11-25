import express from 'express';
import { addTopic,deleteTopic,updateTopic,allTopic,hotTopic,clickedTopic, addPost, deletePost,updatePost, getLatest, getAllByTopic,addEmail,getPostById, login } from '../controller/api.controller.js';
const apiRoutes = express.Router();

apiRoutes.post('/topic/add/', addTopic);
apiRoutes.post('/topic/click/:id', clickedTopic);
apiRoutes.delete('/topic/delete/:id', deleteTopic);
apiRoutes.put('/topic/update/:id', updateTopic);
apiRoutes.get('/topic/hot/',hotTopic);
apiRoutes.get('/topic/all/',allTopic);




apiRoutes.post('/post/add/',   addPost );
apiRoutes.delete('/post/delete/:id',  deletePost );
apiRoutes.put('/post/update/:id', updatePost  );
apiRoutes.get('/post/latest/', getLatest );
apiRoutes.get('/post/getByTopic/:id',  getAllByTopic );
apiRoutes.get('/post/getById/:id',  getPostById );


apiRoutes.post('/newsletter/:email',  addEmail );



apiRoutes.post('/admin/login',  login );


export default apiRoutes;