import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Button, Radio
} from 'semantic-ui-react';

class AddRentalComponent extends React.Component {

  render() {
    return (
      <Form>

        <div>
          <Form.Field>
            Select user
          </Form.Field>
          {this.props.users.filter(u => {
            return !this.state.vehicleId 
              || this.props.vehicles.some(v => v.ownerId !== u.id)
          }).map(u => {
            return (
              <Form.Field key={u.id}>
                <Radio 
                key={u.id}
                label={u.username}
                name='userRenter'
                value={u.id}
                checked={this.state.renterId === u.id}
                onChange={e => this.setRenter(u.id)}
                />
              </Form.Field>
            )
          })}
        </div>
        <div>
          <Form.Field>
            Select vehicle
          </Form.Field>
          {this.props.vehicles.filter(v => {
            return v.ownerId !== this.state.renterId
          }).map(v => {
            return (
              <Form.Field key={v.id}>
                <Radio 
                key={v.id}
                style={padd}
                name='rentedVehicle'
                value={v.id}
                checked={this.state.vehicleId === v.id}
                onChange={e => this.setVehicle(v.id)}
                />
                <label style={padd}>{v.model}</label>
                <label style={padd}>{v.brand}</label>
                <label style={padd}>{v.owner.username}</label>
              </Form.Field>
            )
          })}
        </div>
        <Button 
        onClick={e => this.submitForm(e)}
        >Save rental</Button>
      </Form>
    )
  }

  setRenter = (renterId) => {
    this.setState({renterId: renterId});
  }

  setVehicle = (vehicleId) => {
    this.setState({vehicleId: vehicleId});
  }

  clearInputs = () => {
    this.setState({
      renterId: null,
      vehicleId: null
    })
  }

  onRentalAdded = () => {
    this.clearInputs();
    this.props.history.push('/rentals');
  }

  submitForm = (event) => {
    const rental = {
      renterId: this.state.renterId,
      vehicleId: this.state.vehicleId
    }
    this.props.addRental(rental, this.onRentalAdded);
    event.preventDefault();
  }

  state = {
    renterId: null,
    vehicleId: null
  }
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

AddRentalComponent.propTypes = {
  users: PropTypes.array,
  vehicles: PropTypes.array,
  addRental: PropTypes.func
}

export default AddRentalComponent;