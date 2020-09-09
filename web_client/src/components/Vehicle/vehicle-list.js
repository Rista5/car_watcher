import React from 'react';
import PropTypes from 'prop-types';
import VehicleComponent from "./vehicle";

class VehicleListComponent extends React.Component {

  render() {
    const vehicleList = this.props.vehicles.map((v) => (
      <VehicleComponent
       key={v.id}
       vehicle={v}
       selectedUserId={this.props.selectedUserId}
       isSelected={v.id === this.props.selectedVehicleId}
       onVehicleSelect={this.props.onVehicleSelect}
       ></VehicleComponent>
    ));
    return (
      <div>
        {vehicleList}
      </div>
    )
  }

  onVehicleClick = (vehicleId) => {
    this.props.onVehicleSelect(vehicleId)
  }
}

VehicleListComponent.propTypes = {
  vehicles: PropTypes.array,
  selectedUserId: PropTypes.string,
  selectedVehicleId: PropTypes.string,
  onVehicleSelect: PropTypes.func
}

export default VehicleListComponent;