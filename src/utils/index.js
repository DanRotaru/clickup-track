const getTime = (ms, showSeconds = false) => {
  let totalSeconds = Math.floor(ms / 1000);
  let totalMinutes = Math.floor(totalSeconds / 60);
  let hours = Math.floor(totalMinutes / 60);

  let remainingMinutes = Math.floor(totalMinutes % 60);
  let remainingSeconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    let timeString = `${hours}h`;
    if (remainingMinutes > 0) {
      timeString += ` ${remainingMinutes}m`;
    }
    if (showSeconds && remainingSeconds > 0) {
      timeString += ` ${remainingSeconds}s`;
    }
    return timeString;
  } else if (totalMinutes > 0) {
    let timeString = `${totalMinutes}m`;
    if (showSeconds && remainingSeconds > 0) {
      timeString += ` ${remainingSeconds}s`;
    }
    return timeString;
  } else {
    return `${totalSeconds}s`;
  }
}

const formatDate = (date, withoutDay = false) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  date = new Date(date);
  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${withoutDay ? '' : dayName + ' '}${monthName} ${day}, ${year}`;
}

const isAvailableChromeAPIs = () => {
  return !(typeof chrome === 'undefined' || typeof chrome.runtime === 'undefined' || typeof chrome.storage === 'undefined');
}

export {
  getTime,
  formatDate,
  isAvailableChromeAPIs
}
