import React from 'react';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

class ChartComponent extends React.Component {
  
  render() {
    return (
      <div style={{width: '1000px', height: '200px', margin: 'auto'}}>
        <Line
          data={this.props.readingsData.data}
          options={this.props.readingsData.options}
        ></Line>
      </div>
    );
  }
}

ChartComponent.propTypes = {
  readingsData: PropTypes.object
}

export default ChartComponent;