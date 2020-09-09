
function addMinAndSecToDate(date, min, sec) {
  const nDate = new Date(date);
  nDate.setMinutes(min, sec);
  return nDate;
}

function expandDataPoints(data) {
  const processed = data.map(hr => {
    const date = new Date(hr.date);
    const readings = hr.hourReadings.map(r => {
      const newReading = {
        date: addMinAndSecToDate(date, r.minutes, r.seconds),
        ...r
      };
      delete newReading.minutes;
      delete newReading.seconds;
      
      return newReading;
    });
    return readings;
  }).reduce((acc, curr) =>{
    return acc.concat(curr);
  }, []);
  return processed.filter(d => !Number.isNaN(d.date.getTime())); // filter Invalid Dates
}

export {
  expandDataPoints
}