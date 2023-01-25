import { useState, useEffect } from 'react'
import PageHeader from "../../components/PageHeader/PageHeader";
import ProfilePostDisplay from "../../components/ProfilePostDisplay/ProfilePostDisplay";
import ProfileBio from "../../components/ProfileBio/ProfileBio";

import { useParams } from "react-router-dom";

import { Grid } from "semantic-ui-react";

import userService from "../../utils/userService";

function ProfilePage() {
  const [posts, setPosts] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('')

  const { username } = useParams(); // { username} matches the the route in your App.js <route path='/:username'>
  
  console.log('username in Profile page -> ', username)
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <ProfilePostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default ProfilePage;
