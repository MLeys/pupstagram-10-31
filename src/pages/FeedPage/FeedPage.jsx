import PageHeader from "../../components/PageHeader/PageHeader";
import AddPuppyForm from "../../components/AddPuppyForm/AddPuppyForm";
import PostDisplay from "../../components/PostDisplay/PostDisplay";

import { Grid } from "semantic-ui-react";


function FeedPage() {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <PageHeader />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <AddPuppyForm />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostDisplay />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

export default FeedPage;
