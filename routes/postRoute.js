const express = require('express');
const postController = require('../controllers/postController');
const postRoute = express.Router();
const auth = require('../authentication/auth');

const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'public/uploads'));
    },
    filename: function (req, file, cb) {
        let name = Date.now() + '-' + file.originalname;
        cb(null, name);
    }
});

const upload = multer({ storage: storage});

postRoute.post('/createpost',upload.single('media'), auth.isLogin, postController.createPost);


// postRoute.post('/createpost', auth.isLogin, postController.createPost);

postRoute.post('/getposts', auth.isLogin, postController.getAllPosts);
//delete post 
postRoute.post('/deletepost', auth.isLogin, postController.deletePost);


postRoute.post('/addcomment', auth.isLogin, postController.addComment);
//delete comment
postRoute.post('/deletecomment', auth.isLogin, postController.deleteComment);
postRoute.post('/likepost', auth.isLogin, postController.likePost);

postRoute.post('/dislikepost',auth.isLogin,postController.disLikePost);
//Update title of the post
postRoute.post('/updatetitle',auth.isLogin,postController.updatePostTitle);
//Update description of the post
postRoute.post('/updatedescription',auth.isLogin,postController.updatePostDescription);

module.exports = postRoute;
