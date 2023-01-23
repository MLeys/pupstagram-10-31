import { Button, Form, Grid, Header, Image, Segment } from "semantic-ui-react";
import { useState } from "react";

// Since we want to make a request as a user about a user
// we need to import the userService
import userService from "../../utils/userService";

function SignUpPage() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    passwordConf: "",
    bio: "",
  });

  const [selectedFile, setSelectedFile] = useState("");

  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault(); // stop the browser from submitting the form, we will use fetch. We are using a SPA (single, page, app, no page reloads)

    // before we use our userService function
    // since we are sending over to the express server a file (photo), we can't send json
    // we have to convert our data into formData!
    // THIS ONLY HAS TO BE DONE WHEN YOU'RE SENDING A FILE (PHOTO TO THE SERVER, everything else is just JSON
    const formData = new FormData();
    formData.append("photo", selectedFile);

    // formData.append('username', state.username)
    // formData.append('email', state.email)
    for (let key in state) {
      formData.append(key, state[key]);
    }

	// if you console.log(formData, ' <this won't yield anything useful')
    // If you want to view the formData you need to loop over the object
    console.log(formData.forEach((item) => console.log(item)));
  }

  function handleChange(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function handleFileInput(e) {
    // e.target.files is an array, we just want the first file uploaded to set in state
    setSelectedFile(e.target.files[0]);
  }

  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="purple" textAlign="center">
          <Image src="https://i.imgur.com/TM4eA5g.jpg" /> Sign Up
        </Header>
        <Form autoComplete="off" onSubmit={handleSubmit}>
          <Segment stacked>
            <Form.Input
              name="username"
              placeholder="username"
              value={state.username}
              onChange={handleChange}
              required
            />
            <Form.Input
              type="email"
              name="email"
              placeholder="email"
              value={state.email}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="password"
              type="password"
              placeholder="password"
              value={state.password}
              onChange={handleChange}
              required
            />
            <Form.Input
              name="passwordConf"
              type="password"
              placeholder="Confirm Password"
              value={state.passwordConf}
              onChange={handleChange}
              required
            />
            <Form.TextArea
              label="bio"
              name="bio"
              value={state.bio}
              placeholder="Tell us more about your dogs..."
              onChange={handleChange}
            />
            <Form.Field>
              <Form.Input
                type="file"
                name="photo"
                placeholder="upload image"
                onChange={handleFileInput}
              />
            </Form.Field>
            <Button type="submit" className="btn">
              Signup
            </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
      </Grid.Column>
    </Grid>
  );
}

export default SignUpPage;
