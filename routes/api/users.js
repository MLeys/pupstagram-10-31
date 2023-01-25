import express from 'express';
const router = express.Router();
import usersCtrl  from '../../controllers/users.js';
import multer from 'multer'
const upload = multer()
/*---------- Public Routes ----------*/
router.post('/signup', upload.single('photo'), usersCtrl.signup);
router.post('/login', usersCtrl.login);
router.get('/:username', usersCtrl.profile);

/*---------- Protected Routes ----------*/




export default router;