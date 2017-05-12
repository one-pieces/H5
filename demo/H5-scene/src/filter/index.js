export function timeStampToCNTimeFormat(timeStamp) {
  // Create a new JavaScript Date object based on the timestamp

  if (!timeStamp) {
    return '无'
  }

  let date = new Date(timeStamp);
  let years = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  // Hours part from the timestamp
  let hours = date.getHours();
  // Minutes part from the timestamp
  let minutes = "0" + date.getMinutes();
  // Seconds part from the timestamp
  let seconds = "0" + date.getSeconds();

  let formatDate = years + '年' + month + '月' + day + '日';

  // Will display time in 10:30:23 format
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

  return formatDate + ' ' + formattedTime;
}