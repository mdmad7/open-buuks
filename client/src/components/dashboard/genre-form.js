import React, { Component } from 'react';
import axios from 'axios';
import { Button, Form, Message } from 'semantic-ui-react';
class GenreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
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
      this.setState({
        error: response.data.message,
      });
    });
  };
  render() {
    return (
      <Form
        onSubmit={this.handleSubmit}
        warning={this.state.error != null ? true : false}
      >
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="Drama, Thriller, Romance, etc."
            name="name"
            onChange={this.handleChange}
            required
          />
          <Message
            warning
            header="Duplicate Entry"
            content={`${this.state.name} already exists`}
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
