import React from 'react';
import { Button, Form, Message } from 'semantic-ui-react';

const GenreForm = ({
  name,
  genre,
  error,
  onSubmit,
  actionname,
  color,
  onChange,
}) => {
  return (
    <Form onSubmit={onSubmit} warning={error != null ? true : false}>
      <Form.Field>
        <label>Name</label>
        <input
          placeholder="Drama, Thriller, Romance, etc."
          name="name"
          onChange={onChange}
          required
          defaultValue={genre ? genre.name : name}
        />
        <Message
          warning
          header="Duplicate Entry"
          content={
            genre ? `${genre.name} already exists` : `${name} already exists`
          }
        />
      </Form.Field>
      <Button color={color} type="submit">
        {actionname}
      </Button>
    </Form>
  );
};

export default GenreForm;
