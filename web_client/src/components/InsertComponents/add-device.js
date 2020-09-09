import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
  Label, Form, Input, Button, Dropdown
} from 'semantic-ui-react';

class AddDeviceComponent extends React.Component {

  render() {
    const sensors = this.state.attachedSensors.map(s => {
      return (
        <div key={s.id}>
          <div style={padd}>{s.type}</div>
          <div style={padd}>{s.valueType}</div>
        </div>
      );
    });

    return (
      <Form style={formStyle}>
        <h3>Add device</h3>
        <Form.Field>
          <Label>DeviceId </Label>
          <Input 
          placeholder={"Insert device id"}
          onChange={e => this.setDeviceId(e.target.value)}/>
        </Form.Field>
        <Form.Field>
          <Label>Platform </Label>
          <Input 
          placeholder={"Insert platform"}
          onChange={e => this.setPlatform(e.target.value)}/>
        </Form.Field>
        <div>
          <Form.Field>
            <Label>Sensor type </Label>
            <Dropdown 
            placeholder={"Select sensor type"}
            options={sensorTypes.filter(o => 
              !this.state.attachedSensors.some(s => s.type === o.value))}
            selection
            value={this.state.sensorType}
            onChange={this.setSensorType}
            />
          </Form.Field>
          <Form.Field>
            <Label>Sensor value type </Label>
            <Dropdown 
            placeholder={"Select sensor value type"}
            options={sensorValueTypes}
            selection
            value={this.state.sensorValueType}
            onChange={this.setSensorValueType}/>
          </Form.Field>
          <Button
          onClick={this.addSensor}
          >Add sensor</Button>
        </div>
        <div>
          <div>Sensors:</div>
          {sensors}
        </div>
        <Button
        onClick={e => this.submitForm(e)}
        >Submit</Button>
      </Form>
    )
  }

  setDeviceId = (deviceId) => {
    this.setState({deviceId: deviceId});
  }

  setPlatform = (platform) => {
    this.setState({platform: platform});
  }

  setSensorType = (event, {value}) => {
    this.setState({sensorType: value});
  }

  setSensorValueType = (event, {value}) => {
    this.setState({sensorValueType: value});
  }

  clearSensorInputs = () => {
    this.setState({
      sensorType: '',
      sensorValueType: ''
    })
  }

  addSensor = () => {
    if (this.state.sensorType && this.state.sensorValueType) {
      let id = this.state.attachedSensors.length > 0
      ? this.state.attachedSensors.reduce((acc, s) => {
          return Math.max(acc, s.id);
        })
      : 0;
      id += 1;
      const newSensor = {
        id: id,
        type: this.state.sensorType,
        valueType: this.state.sensorValueType
      }
      this.setState({
        attachedSensors: [...this.state.attachedSensors, newSensor],
        sensorType: '',
        sensorValueType: ''
      });
      this.clearSensorInputs();
    }
  }

  onDeviceAdd = () =>{
    this.props.history.goBack();
  }

  submitForm = (event) => {
    const device = {
      deviceId: this.state.deviceId,
      platform: this.state.platform,
      vehicleId: this.props.vehicleId,
      isCollecting: false,
      attachedSensors: this.state.attachedSensors.map(s => {
        return {
          type: s.type, 
          valueType: s.valueType
        }
      })
    }
    this.props.addDevice(device, this.onDeviceAdd);
    event.preventDefault();
  }

  state = {
    deviceId: '',
    platform: '',
    attachedSensors: [],
    sensorType: '',
    sensorValueType: ''
  }
}

const sensorTypes = [
  {key: 'temp', value: 'temp', text: 'Temperature'},
  {key: 'speed', value: 'speed', text: 'Speed'},
  {key: 'rpm', value: 'rpm', text: 'Revolutions per minute'},
  {key: 'gas', value: 'gas', text: 'Gas'},
  {key: 'battery', value: 'battery', text: 'Battery'},
]

const sensorValueTypes = [
  {key: 'float', value: 'float', text: 'float'},
  {key: 'integer', value: 'integer', text: 'integer'},
  {key: 'string', value: 'string', text: 'string'}
]

const formStyle = {
  width: '500px',
  margin: 'auto'
}

const padd = {
  padding: '5px',
  display: 'inline-block'
}

AddDeviceComponent.propTypes = {
  vehicleId: PropTypes.string,
  addDevice: PropTypes.func
}

export default withRouter(AddDeviceComponent);