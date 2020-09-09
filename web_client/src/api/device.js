import axios from '.';

function getVehicleDevice(vehicleId) {
  return axios.get('/api/device/vehicleId/'+vehicleId);
}

function getDevices() {
  return axios.get('/api/device/all/')
}

function saveDevice(device) {
  return axios.post('/api/device/', device);
}

function updateDevice(deviceId, data) {
  return axios.put('/api/device/'+deviceId, data);
}

export {
  getVehicleDevice,
  getDevices,
  saveDevice,
  updateDevice
}