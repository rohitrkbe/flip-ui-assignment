// get date in a specific format
const MonthsName = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export const FormattedDate = (date, days) => {
  let dateObj = new Date(Date.parse(date) + days * 24 * 60 * 60 * 1000);
  return (
    dateObj.getDate() +
    ' ' +
    MonthsName[dateObj.getMonth()] +
    ' ' +
    dateObj.getFullYear()
  );
};

export const DateFormat = dateString => {
  let someDate = new Date(dateString);
  someDate = someDate.getTime();
  let date = new Date(someDate);
  let months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();
  let formattedDate_DAY_MONTH = day + ' ' + month + ' ';
  let formattedDate_DAY_MONTH_YEAR = day + ' ' + month + ' ' + year + ' ';
  // let formattedDate_DAY_MONTH_YEAR_TIME =
  //   day + ' ' + month + ' ' + year + ', ' + hour + ':' + minutes;
  return formattedDate_DAY_MONTH_YEAR;
};

export const GetDateString = timestamp => {
  let [date, time] = timestamp.split(' ');
  let [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};
