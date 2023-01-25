import { Card } from "semantic-ui-react";
import PostCard from '../PostCard/PostCard'


function PostDisplay({posts}) {
  const postsJsx = posts.map((post) => {
    return <PostCard post={post} key={post._id} />;
  });

  return <Card.Group itemsPerRow={1}>{postsJsx}</Card.Group>;
}

export default PostDisplay;
