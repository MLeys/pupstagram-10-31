import PageHeader from "../../components/PageHeader/PageHeader";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";

import { useState, useEffect } from 'react'

// import { create } from '../../utils/postApi'
import * as postsAPI from '../../utils/postApi';


import { Grid } from "semantic-ui-react";

// think of your pages as containers
// that store your logic!
function FeedPage() {
  const [posts, setPosts] = useState([])

  //Functions here that make our api calls 
  async function handleAddPost(post){
	// this is where we will make the api call to our server
	// because we'll get the response and then we can update state to reflect that change
	// like adding a new post
	console.log(post, " <- this is the post object in handle Add post")
	try {

		const response = await postsAPI.create(post)
		console.log(response, ' from postsApi create')
    setPosts([response.post, ...posts])

	} catch(err){
		console.log(err, ' in handleAddPost')
	}

  }

  async function getPosts() {
    try {
      const response = await postsAPI.getAll();
      console.log(response, " data");
      setPosts(response.data);
      
    } catch (err) {
      console.log(err.message, " this is the error");
      
    }
  }

  // this useEffect runs when the Feed page loads!
  useEffect(() => {
    //Getting posts, C(R)UD

    getPosts();
  }, []); 

  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPuppyForm handleAddPost={handleAddPost}/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay posts={posts}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FeedPage;
