import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class VehicleComponent extends React.Component {

  render() {
    return (
      <div style={this.getStyle()}>
        <div style={padd}>{this.props.vehicle.brand}</div>
        <div style={padd}>{this.props.vehicle.model}</div>
        <div style={padd}>{this.props.vehicle.maxSpeed}</div>
        <div style={padd}>{this.props.vehicle.weight}</div>
        <div style={padd}>{this.props.vehicle.owner.username}</div>
        <button 
         style={{...btnStyle, ...padd}}
         onClick={this.onVehicleSelect}>Select</button>
        <button
        style={{margin: '5px'}}
        onClick={this.showVehicleDetails}
        >Show device details</button>
      </div>
    );
  }

  showVehicleDetails = () => {
    this.props.history.push('/vehicle-details/'+this.props.vehicle.id);
  }

  onVehicleSelect = () => {
    this.props.onVehicleSelect(this.props.vehicle.id);
  }

  getStyle = () => {
    const col = this.props.isSelected 
      ? "#90EE90" 
      : this.props.selectedUserId === this.props.vehicle.ownerId 
        ? '#ffa500' 
        :  "#FFFFFF"
    return {
      background: col,
      margin: 'auto'
    }
  }
}

VehicleComponent.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string.isRequired,
    model: PropTypes.string,
    maxSpeed: PropTypes.number,
    weight: PropTypes.number,
    ownerId: PropTypes.string,
    owner: PropTypes.shape({
      username: PropTypes.string
    })
  }).isRequired,
  selectedUserId: PropTypes.string,
  isSelected: PropTypes.bool,
  onVehicleSelect: PropTypes.func
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

const btnStyle = {
  background: "#32CD32",
  cursor: 'pointer',
}

export default withRouter(VehicleComponent);