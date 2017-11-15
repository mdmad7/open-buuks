import React from 'react';
import { Grid, Modal, Header, Button } from 'semantic-ui-react';
import GenreForm from '../../components/dashboard/genre-form';

const GenrePage = () => {
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
            <Header icon="add" content="Create a Genre" />
            <Modal.Content>
              <GenreForm />
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default GenrePage;
