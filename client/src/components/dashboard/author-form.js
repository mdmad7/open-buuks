import React from 'react';
import moment from 'moment';
import {
  Button,
  Form,
  TextArea,
  Input,
  Icon,
  Message,
} from 'semantic-ui-react';

const AuthorForm = ({
  searchAuthor,
  searchError,
  loading,
  onSubmit,
  actionname,
  color,
  onChange,
  author,
  visibleMessage,
  onDismiss,
}) => {
  return (
    <div>
      {color === 'blue' ? (
        <Form
          onSubmit={searchAuthor}
          warning={searchError.switch !== false ? true : false}
        >
          <Form.Field>
            <Input
              icon={<Icon name="search" circular link />}
              id="authorSearch"
              name="author-search"
              placeholder="Eg. Charles Dickens"
              onChange={onChange}
            />
            <Message warning content={searchError ? searchError.msg : ''} />
          </Form.Field>
        </Form>
      ) : null}

      <Form onSubmit={onSubmit} loading={loading}>
        <Form.Field>
          <label>First Name</label>
          <input
            required
            onChange={onChange}
            name="first_name"
            placeholder="First Name"
            value={author.first_name ? author.first_name : ''}
          />
        </Form.Field>
        <Form.Field>
          <label>Family Name</label>
          <input
            required
            onChange={onChange}
            name="family_name"
            value={author.family_name ? author.family_name : ''}
            placeholder="Family Name"
          />
        </Form.Field>
        <Form.Field>
          <label>Bio</label>
          <TextArea
            onChange={onChange}
            name="bio"
            autoHeight
            placeholder="Biography"
            value={author.bio ? author.bio : ''}
          />
        </Form.Field>
        <Form.Field>
          <label>Date of Birth</label>
          <input
            onChange={onChange}
            name="date_of_birth"
            type="date"
            placeholder="Date of Birth"
            value={
              author.date_of_birth
                ? moment(author.date_of_birth).format('YYYY-MM-DD')
                : ''
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Date of Death</label>
          <input
            onChange={onChange}
            name="date_of_death"
            type="date"
            value={
              author.date_of_death
                ? moment(author.date_of_death).format('YYYY-MM-DD')
                : ''
            }
            placeholder="Date of Death"
          />
        </Form.Field>
        <Button color={color} type="submit">
          {actionname}
        </Button>

        {visibleMessage !== false && color === 'green' ? (
          <Message positive onDismiss={onDismiss} header="Edit Successful" />
        ) : null}
      </Form>
    </div>
  );
};

export default AuthorForm;
