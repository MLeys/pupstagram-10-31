import User from '../models/user.js'
import jwt from 'jsonwebtoken'
const SECRET = process.env.SECRET;

import S3 from 'aws-sdk/clients/s3.js';
// initialize the S3 consturctor function to give us the object that can perform crud operations to aws
const s3 = new S3();

// We'll use this module to help us generate random names for our photo files on aws
import { v4 as uuidv4 } from 'uuid';

// So we don't have to worry about people having different bucket names we'll make the bucketname an environment variable
const BUCKET_NAME = process.env.BUCKET_NAME
console.log(BUCKET_NAME, 'bucketname')


export default {
  signup,
  login
};


async function signup(req, res) {
  console.log(req.body, " <- contents of the form", req.file, ' <- this is req.file')

  if(!req.file) return res.status(400).json({error: "Please Submit a Photo"})

  // where we will store our image on aws s3 bucket
  const filePath = `pupstagram/${uuidv4()}-${req.file.originalname}`
  const params = {Bucket: BUCKET_NAME, Key: filePath, Body: req.file.buffer}; // req.file.buffer is the actually from the form when it was sent to our express server
  // s3.upload is making the request to s3
  s3.upload(params, async function(err, data){ // < inside the function in the response from aws
    if(err){
      console.log('===============================')
      console.log(err, ' <- error from aws, Probably telling you your keys arent correct')
      console.log('===============================')
      return res.status(400).json({error: 'error from aws, check your terminal'})
    }


    const user = new User({...req.body, photoUrl: data.Location}); // data.Location is the url for your image on aws
    try {
      await user.save(); // user model .pre('save') function is running which hashes the password
      const token = createJWT(user);
      res.json({ token }); // set('toJSON',) in user model is being called, and deleting the users password from the token
    } catch (error) {
      // Probably a duplicate email
      console.log(error)
      res.status(400).json(error);
    }



  }) // end of the s3 callback
} // end of signup

async function login(req, res) {
 
  try {
    // if this doesn't find anything it returns undefined
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


