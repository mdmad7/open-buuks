import React from 'react';
import { Grid, Modal, Header, Button } from 'semantic-ui-react';
import BookForm from '../../components/dashboard/book-form';

const BookPage = () => {
  return (
    <Grid textAlign="right">
      <Grid.Row>
        <Grid.Column>
          <Modal
            size="tiny"
            trigger={
              <Button primary content="Add" icon="add" labelPosition="left" />
            }
          >
            <Header icon="add" content="Create Book" />
            <Modal.Content>
              <BookForm />
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default BookPage;
