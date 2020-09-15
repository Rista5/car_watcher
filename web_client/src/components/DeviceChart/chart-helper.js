const SensorMappings = {
  temperature: {key: 'temp', value: 'Temperature', text: 'Temperature', unit: 'C'},
  speed: {key: 'speed', value: 'Speed', text: 'Speed', unit: 'km/h'},
  rpm: {key: 'rpm', value: 'Revolutions per minute', text: 'Revolutions per minute'},
  battery: {key: 'batt', value: 'Battery charge', text: 'Battery charge', unit: 'Ah'},
  gas: {key: 'gas', value: 'Gas', text: 'Gas', unit: 'l'}
}

function getDatasetConfig(readings, sensorMapping) {
  const config = {
    label: sensorMapping.value,
    backgroundColor: 'rgba(10,100,200,0.5)',
    data: readings.map(r => r[sensorMapping.key]),
  }
  if (sensorMapping.unit) {
    config.label += '( ' + sensorMapping.unit + ' )'
  }
  return config;
}

function preapareChartData(readings, sensorMapping, startDate, endDate) {
  const timeFormat = 'dd/mm/yyyy';
  const config = getDatasetConfig(readings, sensorMapping);
  return {
    data: {
      labels: readings.map((r,i) => r.date),
      datasets: [ config ]
    },
    options: {
      maintainAspectRatio: false,
      responsive: false,
      tooltips: {
        mode: 'label'
      },
      scales: {
        xAxes: [{
          type: "time",
          time: {
            format: timeFormat,
            tooltipFormat: 'll',
            min: startDate,
            max: endDate
          },
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: false,
          }
        }]
      }
    }
  }
}

export {
  SensorMappings,
  preapareChartData
}