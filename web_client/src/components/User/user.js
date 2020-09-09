import React from 'react';
import PropTypes from 'prop-types';

class UserComponent extends React.Component {
  clicked = () => {
    this.props.clicked(this.props.user.id);
  }

  getStyle = () => {
    return {
      maxWidth: '500px',
      margin: 'auto',
      background: this.props.isSelected ? "#90EE90" : "#FFFFFF"
    }
  }

  render() {
    return (
      <div style={this.getStyle()}>
        <div style={padd}>{this.props.user.username}</div>
        <div style={padd}>{this.props.user.email}</div>
        <button
         style={{...btnStyle, ...padd}}
         onClick={this.clicked}>Select</button>
      </div>
    );
  }
}

UserComponent.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    username: PropTypes.string.isRequired,
    email: PropTypes.string
  }).isRequired,
  clicked: PropTypes.func,
  isSelected: PropTypes.bool
}

const btnStyle = {
  background: "#32CD32",
  cursor: 'pointer',
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

export default UserComponent;