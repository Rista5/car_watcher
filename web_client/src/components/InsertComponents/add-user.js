import React from 'react';
import PropTypes from 'prop-types';
import {
  Label, Form, Input, Button,
} from 'semantic-ui-react';

class AddUserComponent extends React.Component {

  render() {
    return (
      <Form style={padd}>
        <Form.Field>
          <Label>Username: </Label>
          <Input 
            placeholder={"Insert username"}
            value={this.state.username}
            onChange={e => this.setUsername(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <Label>Password: </Label>
          <Input 
            placeholder={"Insert password"} 
            type={"password"}
            value={this.state.password}
            onChange={e => this.setPassword(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <Label>Email: </Label>
          <Input 
            placeholder={"Insert email"}
            value={this.state.email}
            onChange={e => this.setEmail(e.target.value)}/>
        </Form.Field>
        <Button onClick={e => this.submitForm(e)}>Add user</Button>
      </Form>
    )
  }

  setUsername = (username) => {
    this.setState({username: username});
  }

  setPassword = (password) => {
    this.setState({password: password});
  }

  setEmail = (email) => {
    this.setState({email: email});
  }
  
  clearInputs = () => {
    this.setState({
      username: '',
      password: '',
      email: ''
    });
  }

  onUserAdded = () => {
    this.clearInputs();
  }

  submitForm = (event) => {

    // send request
    const user = {
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    }
    this.props.addUser(user, this.onUserAdded);
    event.preventDefault();
  }

  state = {
    username: '',
    password: '',
    email: ''
  }
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

AddUserComponent.propTypes ={
  addUser: PropTypes.func
}

export default AddUserComponent;