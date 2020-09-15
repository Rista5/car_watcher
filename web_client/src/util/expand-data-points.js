
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
        date: addMinAndSecToDate(date, r.min, r.sec),
        ...r
      };
      delete newReading.min;
      delete newReading.sec;
      
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