import { set } from "mongoose";
import { useState } from "react";
import { Form, Segment, Button } from "semantic-ui-react";

function AddPuppyForm() {

  const [caption, setCaption] = useState('');
  const [photo, setPhoto] = useState(null)

  function handleChange(e){
	setCaption(e.target.value)
  }

  function handleFileInput(e){
	setPhoto(e.target.files[0])
  }

  function handleSubmit(){

  }

  return (
    <Segment>
      <Form autoComplete="off" onSubmit={handleSubmit}>
        <Form.Input
          className="form-control"
          name="caption"
          value={caption}
          placeholder="What's on your pups mind?"
          onChange={handleChange}
          required
        />
        <Form.Input
          className="form-control"
          type="file"
          name="photo"
          placeholder="upload image"
          onChange={handleFileInput}
        />
        <Button type="submit" className="btn">
          ADD PUPPY
        </Button>
      </Form>
    </Segment>
  );
}

export default AddPuppyForm;
