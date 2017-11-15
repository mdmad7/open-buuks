import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form } from 'semantic-ui-react';
class GenreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = () => {
    axios({
      method: 'post',
      url: '/catalog/genre',
      data: {
        name: this.state.name,
      },
      headers: {
        Authorization: localStorage.getItem('id_token'),
      },
    }).then(response => {
      console.log(response);
    });
  };
  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Drama, Thriller, Romance, etc."
            name="name"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Button color="green" type="submit">
          Create
        </Button>
      </Form>
    );
  }
}

export default GenreForm;
