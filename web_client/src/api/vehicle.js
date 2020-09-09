import axios from '.';

function getVehicles() {
  return axios.get('/api/vehicle/all')
}

function saveVehicle(vehicle) {
  return axios.post('/api/vehicle', vehicle);
}

export {
  getVehicles,
  saveVehicle
}