import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Segment } from 'semantic-ui-react';

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datacount: null,
    };
  }

  componentDidMount() {
    axios({
      method: 'get',
      url: '/catalog/statscount',
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    })
      .then(response => {
        this.setState({
          datacount: response.data,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { datacount } = this.state;
    return (
      <div>
        <Grid columns="equal" centered stackable>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h2>Michael Davis</h2>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Grid columns="equal" centered stackable container>
          <Grid.Row>
            <Grid.Column>
              <div>
                {/* <h3>This Library Contains</h3> */}
                {datacount ? (
                  <Segment.Group>
                    <Segment textAlign="right">
                      {datacount.author_count} Authors
                    </Segment>
                    <Segment textAlign="right">
                      {datacount.book_count} Books
                    </Segment>
                    <Segment textAlign="right">
                      {datacount.book_instance_count} Book Instances
                    </Segment>
                    <Segment textAlign="right">
                      {datacount.genre_count} Genres
                    </Segment>
                  </Segment.Group>
                ) : null}
              </div>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <h4>Book Status</h4>
              </Segment>
            </Grid.Column>
            <Grid.Column>
              <Segment>
                <h1>Hello</h1>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default Homepage;
