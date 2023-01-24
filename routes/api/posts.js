import express from 'express';
const router = express.Router();
import postsCtrl  from '../../controllers/posts.js';
import multer from 'multer'
const upload = multer()
// /*---------- Public Routes ----------*/
router.post('/', postsCtrl.create);

export default router;