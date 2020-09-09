import React from 'react';
import PropTypes from 'prop-types';
import RentalComponent from './rental';

class RentalListComponent extends React.Component {

  render() {
    const rentalList = this.props.rentals.map((r) => (
      <RentalComponent
        key={r.id}
        rental={r}
        selectedUserId={this.props.selectedUserId}
        selectedVehicleId={this.props.selectedVehicleId}
        endRental={this.props.endRental}
      ></RentalComponent>
    ));
    return (
      <div>
        {rentalList}
      </div>
    )
  }
}


RentalListComponent.propTypes = {
  rentals: PropTypes.array,
  selectedUserId: PropTypes.string,
  selectedVehicleId: PropTypes.string,
  onVehicleSelect: PropTypes.func,
  endRental: PropTypes.func
}

export default RentalListComponent;