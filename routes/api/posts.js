import express from 'express';
const router = express.Router();
import postsCtrl  from '../../controllers/posts.js';
import multer from 'multer'
const upload = multer()
// /*---------- Public Routes ----------*/

// single('photo') matches formData.append('photo', photo) in addPuppyForm
router.post('/', upload.single('photo'), postsCtrl.create);

export default router;