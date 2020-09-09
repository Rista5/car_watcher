import axios from '.';

function getRentals() {
  return axios.get('/api/rental/all');
}

function saveRental(rental) {
  return axios.post('/api/rental', rental);
}

function endRental(rentalId) {
  return axios.put('/api/rental/end/'+rentalId);
}

export {
  getRentals,
  saveRental,
  endRental
};