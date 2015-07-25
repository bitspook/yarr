let toArray = (arrayLike) => Array.prototype.slice.call(arrayLike, 0);

export default {
  toArray: toArray,
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
  dataAttrAsClass: (attr, el) => {
    let dataAttrs = toArray(el.classList)
          .filter(c => c.indexOf('data-') >= 0)
          .map(attr => {
            let [_, key, val] = attr.split('-');
            let res = {};
            res[key] = val;
            return res;
          })[0];

    return dataAttrs[attr];
  }
};
