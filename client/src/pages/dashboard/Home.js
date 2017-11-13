import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Segment } from 'semantic-ui-react';
import {
  PieChart,
  Pie,
  Tooltip,
  LabelList,
  ResponsiveContainer,
} from 'recharts';

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
    const data01 = [
      { name: 'Maintenance', value: 4 },
      { name: 'Loaned', value: 2 },
      { name: 'Available', value: 5 },
    ];
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
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart width={200} height={200}>
                    <Pie
                      data={data01}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      label
                    >
                      <LabelList dataKey="name" position="top" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
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
