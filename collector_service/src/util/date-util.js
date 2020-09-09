// get Date with minutes, seconds and miliseconds set to 0
const getDateFlooredAtHours = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours(), 0,0,0); // clear minutes, seconds and miliseconds
    return date;
}

const getDateCeiledAtHours = (timestamp) => {
    const date = new Date(timestamp);
    if (date.getMinutes() > 0 || date.getSeconds() > 0 || date.getMilliseconds() > 0) {
        date.setHours(date.getHours() + 1, 0,0,0);
        return date;
    } else {
        return date;
    }
}

module.exports = {
    getDateFlooredAtHours: getDateFlooredAtHours,
    getDateCeiledAtHours: getDateCeiledAtHours
}