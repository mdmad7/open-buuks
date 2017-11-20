import React from 'react';
import {
  Button,
  Form,
  TextArea,
  Input,
  Icon,
  Dropdown,
  Message,
} from 'semantic-ui-react';
const BookForm = ({
  authors,
  genres,
  book,
  loading,
  searchBook,
  onSubmit,
  searchError,
  actionname,
  color,
  onChange,
  handleDropdownChange,
  visibleMessage,
  onDismiss,
}) => {
  return (
    <div>
      {color === 'blue' ? (
        <Form
          onSubmit={searchBook}
          warning={searchError.switch !== false ? true : false}
        >
          <Form.Field>
            <Input
              icon={<Icon name="search" circular link />}
              id="isbnSearch"
              name="isbnsearch"
              placeholder="Search ISBN..."
              onChange={onChange}
            />
            <Message warning content={searchError ? searchError.msg : ''} />
          </Form.Field>
        </Form>
      ) : null}

      <Form loading={loading} onSubmit={onSubmit}>
        <Form.Field>
          <label>Title</label>
          <input
            placeholder="Title"
            name="title"
            value={book.title ? book.title : ''}
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <Dropdown
            placeholder="Select Author"
            fluid
            selection
            search
            name="book_author"
            value={book ? book.author : ''}
            onChange={handleDropdownChange}
            options={authors}
          />
        </Form.Field>
        <Form.Field>
          <label>ISBN</label>
          <input
            placeholder="ISBN"
            name="isbn"
            value={book.isbn ? book.isbn : ''}
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Summary</label>
          <TextArea
            placeholder="Summary"
            name="summary"
            value={book.summary ? book.summary : ''}
            autoHeight
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Genres</label>
          <Dropdown
            placeholder="Select Genres"
            fluid
            selection
            multiple
            name="genre_array"
            search
            onChange={handleDropdownChange}
            value={book ? book.genre_array : []}
            options={genres}
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

export default BookForm;
