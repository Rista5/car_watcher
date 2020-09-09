import React from 'react';
import PropTypes from 'prop-types';

class RentalComponent extends React.Component {

  render() {
    const endButton = this.props.rental.to 
      ? null 
      : <button
        style={btnStyle}
        onClick={this.endRental}
        >End</button>
    return (
      <div style={this.getStyle()}>
        <div style={padd}>{this.props.rental.renter.username}</div>
        <div style={padd}>{this.props.rental.rentedVehicle.brand}</div>
        <div style={padd}>{this.props.rental.rentedVehicle.model}</div>
        <div style={padd}>{this.formatDateString(this.props.rental.from)}</div>
        <div style={padd}>{this.formatDateString(this.props.rental.to)}</div>
        {endButton}
      </div>
    )
  }

  formatDateString = (str) =>  {
    if (!str)
      return '';
    try {
      const date = new Date(str);
      return date.toDateString()
    } catch (error) {
      console.error(error);
    }
  }

  endRental = () => {
    this.props.endRental(this.props.rental.id);
  }

  getStyle = () => {
    const col = this.props.selectedUserId === this.props.rental.renterId
      && this.props.selectedVehicleId === this.props.rental.vehicleId
        ? '#ffa500' : "#FFFFFF";
    return {
      background: col
    }
  }
}

RentalComponent.propTypes = {
  rental: PropTypes.shape({
    id: PropTypes.string,
    renterId: PropTypes.string,
    vehicleId: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    renter: PropTypes.object,
    rentedVehicle: PropTypes.object
  }).isRequired,
  selectedUserId: PropTypes.string,
  selectedVehicleId: PropTypes.string,
  endRental: PropTypes.func
}

const btnStyle = {
  background: "#32CD32",
  cursor: 'pointer',
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

export default RentalComponent;