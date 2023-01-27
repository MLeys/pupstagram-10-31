import { Header, Segment, Image, Icon, Grid } from "semantic-ui-react";
import { Route, Routes, Link, Navigate } from "react-router-dom";

function PageHeader({ handleLogOut, loggedUser }) {
  console.log(loggedUser, ' < --- Logged User')
  const profileLink = '/' + loggedUser?.username

  return (

    <Grid >
      <Grid.Row>
        <Grid.Column width={8}>
          <Header> 
            {
              {loggedUser} ? (
                <Link to={profileLink}>
                  <Image as='h2' textAlign='left' circular src={loggedUser?.photoUrl} avatar />
                </Link>
              ) : ''
            }
          </Header>

        </Grid.Column>   
        <Grid.Column width={8}>
          <Header as='h2' color='blue' textAlign='right' >
            <Link to='/' >
              <Icon name='home' size='large' />
            </Link> 
            {loggedUser ? <Link to='/login' onClick={() => handleLogOut()}>Logout</Link> : ''}
          </Header>

        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default PageHeader;
