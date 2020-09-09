import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import CarWatcherHeader from "./components/Header/header";
import NavigationComponent from './components/Navigation/navigation';
import UserListComponent from "./components/User/user-list";
import VehicleListComponent from './components/Vehicle/vehicle-list';
import RentalListComponent from './components/Rental/rental-list';
import AddUserComponent from "./components/InsertComponents/add-user";
import AddVehicleComponent from "./components/InsertComponents/add-vehicle";
import AddRentalComponent from './components/InsertComponents/add-reantal';
import VehicleDetailsComponent from "./components/Vehicle/vehicle-details";

import { getUsers, saveUser } from './api/user';
import { getVehicles, saveVehicle } from './api/vehicle';
import { getRentals, saveRental, endRental } from "./api/reantal";
import { getDevices, saveDevice, updateDevice } from "./api/device";


class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="App">
          <CarWatcherHeader></CarWatcherHeader>
          <NavigationComponent></NavigationComponent>
          <Route path='/users' render={(props) => (
            <div>
            <AddUserComponent
            {...props}
            addUser={this.addUser}></AddUserComponent>
            <UserListComponent 
            {...props}
            users={this.state.users}
            selectedUserId={this.state.selectedUser ? this.state.selectedUser.id : null}
            onUserSelected={this.onUserSelected}></UserListComponent>
            </div>
          )} />
          <Route path='/vehicles' render={(props) => (
            <VehicleListComponent
            {...props}
            vehicles={this.state.vehicles}
            selectedUserId={this.state.selectedUser ? this.state.selectedUser.id : null}
            selectedVehicleId={this.state.selectedVehicle ? this.state.selectedVehicle.id : null}
            onVehicleSelect={this.onVehicleSelected}
            ></VehicleListComponent>
          )} />
          <Route path='/add-vehicle' render={(props) => (
            <AddVehicleComponent
            {...props}
            users={this.state.users}
            addVehicle={this.addVehicle}
            ></AddVehicleComponent>
          )} />
          <Route path='/rentals' render={(props) => (
            <RentalListComponent
            {...props}
            rentals={this.state.rentals}
            selectedUserId={this.state.selectedUser ? this.state.selectedUser.id : null}
            selectedVehicleId={this.state.selectedVehicle ? this.state.selectedVehicle.id : null}
            endRental={this.finishRental}
            ></RentalListComponent>
          )} />
          <Route path='/add-rental' render={(props) => (
            <AddRentalComponent
            {...props}
            users={this.state.users}
            vehicles={this.state.vehicles}
            addRental={this.addRental}
            ></AddRentalComponent>
          )} />
          <Route path='/vehicle-details/:vehicleId' render={(props) => (
            <VehicleDetailsComponent
            {...props}
            vehicle={this.state.vehicles
              .find(v => v.id === props.match.params.vehicleId)}
            device={this.getDevice(props.match.params.vehicleId)}
            addDevice={this.addDevice}
            changeDeviceStatus={this.changeDeviceStatus}
            ></VehicleDetailsComponent>
          )} />
        </div>
      </Router>
    );
  }

  loadData() {
    getUsers().then(res => {
      const users = res.data;
      console.log(users);
      this.setState({
        users: users ? users : []
      });
    });
    getVehicles().then(res => {
      const vehicles = res.data;
      console.log(vehicles);
      this.setState({
        vehicles: vehicles
      });
    });
    getRentals().then(res => {
      const rentals = res.data;
      console.log(rentals);
      this.setState({
        rentals: rentals
      });
    });
    getDevices().then(res => {
      const devices = res.data;
      console.log(devices);
      this.setState({
        devices: devices
      })
    })
  }

  async componentDidMount() {
    this.loadData();
  }

  onUserSelected = (userId) => {
    const shouldReplace = !this.state.selectedUser 
      || this.state.selectedUser.id !== userId;

    this.setState({
      selectedUser: shouldReplace
        ? this.state.users.find(u => u.id === userId) 
        : null
    });
  }

  onVehicleSelected = (vehicleId) => {
    const shouldReplace = !this.state.selectedVehicle 
      || this.state.selectedVehicle.id !== vehicleId;

    this.setState({
      selectedVehicle: shouldReplace
        ? this.state.vehicles.find(v => v.id === vehicleId)
        : null
    })
  }

  getUsername = (userId) => {
    const user = this.state.users.find(u => u.id === userId);
    return user;
  }

  getVehicle = (vehicleId) => {
    const vehicle = this.state.vehicles.find(v => v.id === vehicleId);
    return vehicle;
  }
  
  addUser = (user, onSucc) => {
    saveUser(user).then(res => {
      if(res.data && res.data.id) {
        this.setState({
          users: [...this.state.users, res.data]
        });
        onSucc();
      }
    }, rejected => console.log(rejected));
  }

  addVehicle = (vehicle, onSucc) => {
    saveVehicle(vehicle).then(res => {
      if(res.data && res.data.id) {
        console.log(res.data);
        this.setState({
          vehicles: [...this.state.vehicles, res.data]
        });
        onSucc();
      }
    }, rejected => console.log(rejected))
  }

  addRental = (rental, onSucc) => {
    saveRental(rental).then(res => {
      if(res.data && res.data.id) {
        this.setState({
          rentals: [...this.state.rentals, res.data]
        });
        onSucc();
      }
    }, rejected => console.log(rejected));
  }

  finishRental = (rentalId) => {
    endRental(rentalId).then(res => {
      if (res.data && res.data.id) {
        const newRentals = this.state.rentals.map(r => {
          return r.id === res.data.id ? res.data : r
        });
        this.setState({
          rentals: newRentals
        });
      }
    });
  }

  getDevice = (vehicleId) => {
    const device = this.state.devices.find(d => d.vehicleId === vehicleId);
    return device;
  }

  addDevice = (device, onSucc) => {
    saveDevice(device).then(res => {
      if(res.data && res.data.id) {
        this.setState({
          devices: [...this.state.devices, res.data]
        });
        onSucc();
      }
    })
  }

  changeDeviceStatus = (deviceId) => {
    const device = this.state.devices.find(d => d.id === deviceId);
    if (!device)
      return;
    const data = {
      isCollecting: !device.isCollecting
    }
    updateDevice(deviceId, data).then(res => {
      if (res.data && res.data.id) {
        const newDevice = res.data;
        newDevice.attachedSensors = device.attachedSensors;
        const newDeviceArr = this.state.devices.map(d => {
          return d.id === newDevice.id ? newDevice : d;
        });
        this.setState({
          devices: newDeviceArr
        });
      }
    })
  }

  state = {
    users: [],
    vehicles: [],
    rentals: [],
    devices: [],
    selectedVehicle: null,
    selectedUser: null,
  }
}

export default App;
