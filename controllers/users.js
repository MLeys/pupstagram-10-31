import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import S3 from 'aws-sdk/clients/s3';
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();

// We'll use this module to help us generate random names for our photo files on aws
import { v4 as uuidv4 } from 'uuid';

// So we don't have to worry about people having different bucket names we'll make the bucketname an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME

export default {
  signup,
  login
};


async function signup(req, res) {
  console.log(req.body, " <- contents of the form", req.file, ' <- this is req.file')
  const user = new User(req.body);
  try {
    // await user.save(); // user model .pre('save') function is running which hashes the password
    const token = createJWT(user);
    res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}

async function login(req, res) {
 
  try {
    const user = await User.findOne({email: req.body.email});
   
    if (!user) return res.status(401).json({err: 'bad credentials'});
    user.comparePassword(req.body.password, (err, isMatch) => {
      
      if (isMatch) {
        const token = createJWT(user);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    {user}, // data payload
    SECRET,
    {expiresIn: '24h'}
  );
}


