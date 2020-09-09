import React from 'react';
import PropTypes from 'prop-types';
import { getReadings } from "../../api/readings";
import { expandDataPoints } from '../../util/expand-data-points';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css'
import {
  Button, Dropdown
} from 'semantic-ui-react';
import {
  SensorMappings,
  preapareChartData
} from './chart-helper';
import Chart from "../Chart/chart";

class DeviceChartsComponent extends React.Component {
  render() {
    return (
      <div>
        <div style={{margin: 'auto', width: '200px'}}>
          <label>Select start time</label>
          <DateTime 
          value={this.state.from}
          onChange={this.setDateFrom}
          />
        </div>
        <br/>
        <label>Select end time</label>
        <div style={{margin: 'auto', width: '200px'}}>
          <DateTime 
          value={this.state.to}
          onChange={this.setDateTo}
          />
        </div>
        <br/>
        <Dropdown 
        placeholder={"Select sensor"}
        options={this.getSensorMappings()}
        selection
        value={this.state.selectedMapping.text}
        onChange={this.setSelectedMapping}/>
        <Button
        onClick={this.loadReadings}
        >Load readings</Button>
        <Chart
        readingsData={this.state.readingsData}
        ></Chart>
      </div>
    )
  }

  loadReadings = () => {
    const fromTime = this.state.from.valueOf();
    const toTime = this.state.to.valueOf();
    const deviceId = this.props.deviceId;

    getReadings(deviceId, fromTime, toTime).then(res => {
      const expanded = expandDataPoints(res.data);
      this.setState({
        expanded: expanded,
        readingsData: preapareChartData(expanded, this.state.selectedMapping,
           this.state.from, this.state.to)
      });
    }, err => console.log('rejected', err));
  }

  getSensorMappings() {
    return Object.values(SensorMappings)
  }

  setSelectedMapping = (event, {value}) => {
    const key = Object.keys(SensorMappings)
      .find(k => SensorMappings[k].text === value);
    const mapping = SensorMappings[key];
    console.log('Key', key);
    console.log('Mapping', mapping);
    if (!mapping) {
      return;
    }
    this.setState({
      selectedMapping: mapping,
      readingsData: preapareChartData(
        this.state.expanded, mapping, this.state.from, this.state.to)
    });
  }

  setDateFrom = (value) => {
    const date = new Date(value);
    this.setState({
      from: date,
      readingsData: preapareChartData(
        this.state.expanded, this.state.selectedMapping, date, this.state.to)
    })
  }

  setDateTo = (value) => {
    const date = new Date(value);
    this.setState({
      to: date,
      readingsData: preapareChartData(
        this.state.expanded, this.state.selectedMapping, this.state.from, date)
    })
  }

  state = {
    from: yesterday(),
    to: new Date(),
    readingsData: {},
    expanded: [],
    selectedMapping: SensorMappings[Object.keys(SensorMappings)[0]]
  }
}

function yesterday() {
  const date = new Date();
  date.setDate(date.getDate() -1)
  return date;
}

DeviceChartsComponent.propTypes = {
  deviceId: PropTypes.string
}

export default DeviceChartsComponent;