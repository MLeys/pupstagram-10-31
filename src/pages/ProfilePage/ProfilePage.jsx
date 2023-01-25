import { useState, useEffect } from "react";
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
  const [error, setError] = useState("");

  const { username } = useParams(); // { username} matches the the route in your App.js <route path='/:username'>

  console.log("username in Profile page -> ", username);

  useEffect(() => {
    async function getProfile() {
		try {
			// making the API CALL
			const response = await userService.getProfile(username)

			setLoading(false);// set loading to false
			setPosts(response.data)
			setProfileUser(response.user)
			console.log(response, ' <- data is getprofile')
		} catch(err){
			console.log(err.message, ' error in getProfile something went wrong with the getProfile api request, check server terminal')
			setError('Profile does not exist'); // <- this is what we show
			// on the page
		}
	}

    getProfile();
  }, [username]);

  if (error) {
    return (
      <>
        <PageHeader />
        <h1>{error}</h1>
      </>
    );
  }

  if (loading) {
    return <h1>Loading....</h1>;
  }

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
