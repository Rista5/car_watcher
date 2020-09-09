import React from 'react';
import { Link } from 'react-router-dom';

class NavigationComponent extends React.Component {

  render() {
    return (
      <nav style={navStyle}>
        <Link to='/users'> Users </Link>|
        <Link to='/vehicles'> Vehicles </Link>|
        <Link to='/add-vehicle'> Add vehicle </Link>|
        <Link to='/rentals'> Rentals </Link>|
        <Link to='/add-rental'> Add Rental </Link>
      </nav>
    )
  }
}

const navStyle = {
  background: '#90ee90',
  display: 'inline'
}

export default NavigationComponent;