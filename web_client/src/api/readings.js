import axios from 'axios';

const READINGS_URL = 'http://car-watcher.com/services/collector';//'http://localhost:3000';

const instance = axios.create({
  baseURL: READINGS_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

function getReadings(deviceId, from, to) {
  const routeStr = '/api/dev-read/' + deviceId + '/' + from + '&' + to;
  return instance.get(routeStr);
}

export {
  getReadings
}