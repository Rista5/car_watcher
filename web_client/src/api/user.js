import axios from '.';

function getUsers() {
  return axios.get('/api/user/all');
}

function saveUser(user) {
  return axios.post('/api/user', user);
}

export {
  getUsers,
  saveUser
}