import React from 'react';
import { Form, Grid, Modal, Header, Button } from 'semantic-ui-react';

const AuthorPage = () => {
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
            <Header icon="add" content="Create Author" />
            <Modal.Content>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder="Drama, Thriller, Romance, etc." />
                </Form.Field>
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <Button positive type="submit">
                Create
              </Button>
            </Modal.Actions>
          </Modal>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default AuthorPage;
