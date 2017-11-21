import React from 'react';
import { Form, Button, Message } from 'semantic-ui-react';

const SignupForm = ({ onSubmit, onChange, user, success }) => {
  return (
    <div className="signup_card">
      <Form onSubmit={onSubmit} success={success}>
        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="Roberta"
            name="first_name"
            required
            onChange={onChange}
            value={user.first_name ? user.first_name : ''}
          />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input
            placeholder="Essandoh"
            name="last_name"
            required
            onChange={onChange}
            value={user.last_name ? user.last_name : ''}
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            type="email"
            placeholder="roberta@openbwks.com"
            name="email"
            onChange={onChange}
            value={user.email ? user.email : ''}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            placeholder="********"
            required
            type="password"
            name="password"
            onChange={onChange}
            value={user.password ? user.password : ''}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
        <Message
          success
          header="Successful Signup"
          content="User was successfully created"
        />
      </Form>
    </div>
  );
};

export default SignupForm;
