export default {
  toArray: (arrayLike) => Array.prototype.slice.call(arrayLike, 0),
  formatDate: (date) => {
    if(!date) return '';

    if(typeof date === 'string')
      date = new Date(date);

    let monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December'
    ];

    let day = date.getDate(),
        monthIndex = date.getMonth(),
        year = date.getFullYear();

    return `${day}, ${monthNames[monthIndex]}, ${year}`;
  },
};
