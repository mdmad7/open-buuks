import React from 'react';
import { Button, Form, TextArea } from 'semantic-ui-react';

const AuthorForm = () => {
  return (
    <Form>
      <Form.Field>
        <label>First Name</label>
        <input name="first_name" placeholder="First Name" />
      </Form.Field>
      <Form.Field>
        <label>Family Name</label>
        <input name="family_name" placeholder="Family Name" />
      </Form.Field>
      <Form.Field>
        <label>Bio</label>
        <TextArea name="bio" autoHeight placeholder="Biography" />
      </Form.Field>
      <Form.Field>
        <label>Date of Birth</label>
        <input name="date_of_birth" type="date" placeholder="Date of Birth" />
      </Form.Field>
      <Form.Field>
        <label>Date of Death</label>
        <input nsme="date_of_death" type="date" placeholder="Date of Death" />
      </Form.Field>
      <Button color="green" type="submit">
        Create
      </Button>
    </Form>
  );
};

export default AuthorForm;
