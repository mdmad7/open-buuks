import React from 'react';
import { Button, Form, Dropdown, Message } from 'semantic-ui-react';
import moment from 'moment';
const BookInstanceForm = ({
  status,
  books,
  handleChange,
  handleDropdownChange,
  onSubmit,
  color,
  actionname,
  bookinstance,
  visibleMessage,
  onDismiss,
}) => {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Field>
        <label>Book</label>
        <Dropdown
          placeholder="Select Book"
          fluid
          selection
          search
          name="book_choosen"
          upward
          value={bookinstance.book_id ? bookinstance.book_id : ''}
          onChange={handleDropdownChange}
          options={books}
        />
      </Form.Field>
      <Form.Field>
        <label>Status</label>
        <Dropdown
          placeholder="Select Book Status"
          fluid
          selection
          upward
          name="status_choosen"
          search
          onChange={handleDropdownChange}
          value={bookinstance.status ? bookinstance.status : ''}
          options={status}
        />
      </Form.Field>
      <Form.Field>
        <label>Due Date</label>
        <input
          onChange={handleChange}
          name="due_back"
          type="date"
          value={
            bookinstance.due_back
              ? moment(bookinstance.due_back).format('YYYY-MM-DD')
              : ''
          }
          placeholder="Enter Due Date"
        />
      </Form.Field>
      <Button color={color} type="submit">
        {actionname}
      </Button>

      {visibleMessage !== false && color === 'green' ? (
        <Message positive onDismiss={onDismiss} header="Edit Successful " />
      ) : null}
    </Form>
  );
};

export default BookInstanceForm;
