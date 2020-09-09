import React from 'react';
import PropTypes from 'prop-types';
import {
  Label, Form, Input, Button, Radio
} from 'semantic-ui-react';

class AddVehicleComponent extends React.Component {

  render() {
    return (
      <Form style={formStyle}>
        <div>
          <Form.Field>
            <Label>Brand </Label>
            <Input 
              placeholder={"Insert brand"}
              value={this.state.brand}
              onChange={e => this.setBrand(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <Label>Model </Label>
            <Input 
              placeholder={"Insert model"}
              value={this.state.model}
              onChange={e => this.setModel(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <Label>Maximum speed </Label>
            <Input 
              placeholder={"Insert max speed"}
              type={"number"}
              value={this.state.maxSpeed}
              onChange={e => this.setMaxSpeed(e.target.value)}/>
          </Form.Field>
          <Form.Field>
            <Label>Vehicle weight </Label>
            <Input 
              placeholder={"Insert weight"}
              type={"number"}
              value={this.state.weight}
              onChange={e => this.setWeight(e.target.value)}/>
          </Form.Field>
          <Button onClick={e => this.submitForm(e)}>Add vehicle</Button>
        </div>
        <div>
          <Form.Field>
            Select user
          </Form.Field>
          {this.props.users.map(u => {
            return (
              <Form.Field key={u.id}>
                <Radio 
                key={u.id}
                label={u.username}
                name='userOwner'
                value={u.id}
                checked={this.state.selectedUser?.id === u.id}
                onChange={e => this.setOwner(u)}
                />
              </Form.Field>
            )
          })}
        </div>
      </Form>
    )
  }

  setBrand = (brand) => {
    this.setState({brand: brand});
  }

  setModel = (model) => {
    this.setState({model: model});
  }

  setMaxSpeed = (maxSpeed) => {
    this.setState({maxSpeed: maxSpeed});
  }

  setWeight = (weight) => {
    this.setState({weight: weight});
  }

  setOwner = (owner) => {
    this.setState({selectedUser: owner});
  }

  clearInputs = () => {
    this.setState({
      brand: '',
      model: '',
      maxSpeed: 120,
      weight: 800,
      selectedUser: null
    })
  }

  onVehicleAdded = () => {
    this.clearInputs();
    this.props.history.push('/vehicles');
  }

  submitForm = (event) => {
    const vehicle = {
      brand: this.state.brand,
      model: this.state.model,
      maxSpeed: 120,
      weight: 800,
      ownerId: this.state.selectedUser.id
    }
    this.props.addVehicle(vehicle, this.onVehicleAdded);
    event.preventDefault();
  }

  state = {
    brand: '',
    model: '',
    maxSpeed: 120,
    weight: 800,
    selectedUser: null
  }
}

const formStyle = {
  width: '500px',
  margin: 'auto'
}

AddVehicleComponent.propTypes = {
  users: PropTypes.array,
  addVehicle: PropTypes.func
}

export default AddVehicleComponent;