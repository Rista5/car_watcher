import React from 'react';
import PropTypes from 'prop-types';
import AddDeviceComponent from './../InsertComponents/add-device';
import DeviceChartsComponent from './../DeviceChart/device-charts';
import {
  Button
} from 'semantic-ui-react';

class VehicleDetailsComponent extends React.Component {

  render() {
    const sensorData = this.props.device?.attachedSensors.map(s => {
      return (
        <div key={s.id}>
          <div style={padd}>{s.type}</div>
          <div style={padd}>{s.valueType}</div>
        </div>
      );
    });
    const deviceInformation = this.props.device?.id
        ? <div>
            <h3>Information about embeded device</h3>
            <div>Device ID: {this.props.device.deviceId}</div>
            <div>Device platform: {this.props.device.platform}</div>
            <div>Collecting status: 
              <Button
              onClick={e => this.changeDeviceStatus()}
              >{this.getDeviceCollectingStatus()}
              </Button>
            </div>
            <b>Sensors:</b>
            {sensorData}
            <br/>
            <DeviceChartsComponent
            deviceId={this.props.device.deviceId}
            ></DeviceChartsComponent>
          </div>
        : this.props.vehicle?.id 
          ? <div>
              <div>Vehicle does not have attached device.</div>
              <AddDeviceComponent
              vehicleId={this.props.vehicle.id}
              addDevice={this.props.addDevice}
              ></AddDeviceComponent>
            </div>
          : <div></div>

    const vehicleInformation = this.props.vehicle 
    ? <div>
        <h3>Vehicle information</h3>
        <div>Brand: {this.props.vehicle.brand}</div>
        <div>Model: {this.props.vehicle.model}</div>
        <div>Max speed: {this.props.vehicle.maxSpeed}</div>
        <div>Weight : {this.props.vehicle.weight}</div>
        <div>Owner: {this.props.vehicle.owner.username}</div>
        <br/>
        {deviceInformation}
      </div>
      : <div>Vehicle not found</div>
    return (
      <div>
        {vehicleInformation}
      </div>
    )
  }

  changeDeviceStatus = () => {
    this.props.changeDeviceStatus(this.props.device.id);
  }

  getDeviceCollectingStatus = () => {
    const message = this.props.device.isCollecting 
    ? 'Collceting'  // 'Device is currently collecting data' :
    : 'Not collecting'  //'Device is not collecting data';
    return message;
  }
}

VehicleDetailsComponent.propTypes = {
  vehicle: PropTypes.shape({
    id: PropTypes.string,
    brand: PropTypes.string,
    model: PropTypes.string,
    maxSpeed: PropTypes.number,
    weight: PropTypes.number,
    ownerId: PropTypes.string,
    owner: PropTypes.object
  }),
  addDevice: PropTypes.func,
  changeDeviceStatus: PropTypes.func
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

export default VehicleDetailsComponent;