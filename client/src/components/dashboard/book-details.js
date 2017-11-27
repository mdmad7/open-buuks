import React from 'react';
import { Image, Modal, Header } from 'semantic-ui-react';

const BookDetails = ({ book }) => {
  return (
    <Modal.Content image>
      <Image
        // wrapped
        size="medium"
        src={`http://covers.openlibrary.org/b/isbn/${book.isbn}-L.jpg`}
      />
      <Modal.Description>
        <Header>{book.title}</Header>
        <p>
          <strong>Written By: </strong> {book.author.fullname}
        </p>
        <p>
          <strong>Date of Birth: </strong> {book.author.date_of_birth_formatted}
        </p>
        <p>
          <strong>Date of Death: </strong>
          {book.author.date_of_death_formatted}
        </p>
        <p>
          <strong>ISBN: </strong> {book.isbn}
        </p>
        <p>
          <strong>Publisher: </strong> {book.publisher}
        </p>
        <p>
          <strong>Summary: </strong>
          {book.summary}
        </p>
        <p>
          <strong>Genres: </strong>
          {book.genre.map(g => {
            return <span key={g._id}>{g.name}, </span>;
          })}
        </p>
      </Modal.Description>
    </Modal.Content>
  );
};

export default BookDetails;
