import React from 'react';
import PropTypes from 'prop-types';
import UserComponent from './user'

class UserListComponent extends React.Component {

  render() {
    const userList = this.props.users.map((user) => (
      <UserComponent 
        key={user.id}
        user={user} 
        isSelected={user.id === this.props.selectedUserId}
        clicked={this.onUserClick}></UserComponent>
    ));
    return (
      <div style={listStyle}>
        {userList}
      </div>
    )
  }

  onUserClick = (userId) => {
    if (this.props.onUserSelected) {
      this.props.onUserSelected((userId));
    }
  }
}

const listStyle = {
  // maxWidth: '500px'
}

UserListComponent.propTypes = {
  users: PropTypes.array.isRequired,
  selectedUserId: PropTypes.string,
  onUserSelected: PropTypes.func
}

export default UserListComponent;