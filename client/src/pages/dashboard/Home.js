import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Segment, Container } from 'semantic-ui-react';
import { Pie, Line } from 'react-chartjs-2';

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
        console.log(response.data);
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
    const pieData = {
      labels: ['Maintenance', 'Loaned', 'Reserved', 'Available'],
      datasets: [
        {
          data: [
            datacount ? datacount.book_instance_available_count : 0,
            datacount ? datacount.book_instance_loaned_count : 0,
            datacount ? datacount.book_instance_maintenance_count : 0,
            datacount ? datacount.book_instance_reserved_count : 0,
          ],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#addb56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#addb56'],
        },
      ],
    };

    const data = {
      labels: ['Books', 'Authors', 'Bookinstances', 'Genres'],
      datasets: [
        {
          label: '',
          fill: true,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [
            datacount ? datacount.book_count : 0,
            datacount ? datacount.author_count : 0,
            datacount ? datacount.book_instance_count : 0,
            datacount ? datacount.genre_count : 0,
          ],
        },
      ],
    };
    return (
      <div>
        {console.log(this.props)}
        <Grid columns="equal" centered stackable>
          <Grid.Row>
            <Grid.Column>
              <Segment>
                <h2>
                  Hello, {''}
                  <span className="text-capitalize">
                    {this.props.firstName} {this.props.lastName}
                  </span>
                </h2>
                <h4>{this.props.email}</h4>
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>

        <Container>
          <Grid columns="equal" centered stackable>
            <Grid.Row>
              <Grid.Column width={6}>
                <Segment>
                  <h4>Book Status</h4>
                  <Pie data={pieData} />
                </Segment>
              </Grid.Column>

              <Grid.Column>
                <Segment>
                  <h4>This Library Contains</h4>
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
                </Segment>
              </Grid.Column>

              <Grid.Column width={6}>
                <Segment>
                  <h4>Book Status</h4>
                  <Line data={data} />
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default Homepage;
