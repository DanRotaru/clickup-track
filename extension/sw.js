const API = {
  baseURL: 'https://api.clickup.com/api/v2/team/',
  token: null,
  teamId: null,

  async makeRequest(endpoint) {
    if (!this.token || !this.teamId) {
      console.error('Missing user TOKEN or teamId!');
      return;
    }

    const request = await fetch(this.baseURL + this.teamId + endpoint, {
      headers: {
        Authorization: this.token
      }
    });

    if (request.ok)
      return await request.json();

    console.error('Error while making request');
  },

  async getTodayTimeEntries() {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0)).getTime();
    const endOfDay = new Date(now.setHours(23, 59, 59, 999)).getTime();

    return await this.makeRequest(`/time_entries?start_date=${startOfDay}&end_date=${endOfDay}`);
  },

  async getCurrentTimeEntry() {
    return await this.makeRequest(`/time_entries/current?include_location_names=true`);
  }
}

chrome.runtime.onMessage.addListener(async (e) => {
  if (!e)
    return;

  if (e.task === 'SIGN_IN') {
    const {token, teamId, trackHours} = e.data;

    await chrome.storage.local.set({
      ClickUpStorage: {
        token,
        teamId,
        trackHours
      }
    });

    await main();
  }
});


function getTime(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  } else if (minutes > 0) {
    return `${minutes}m`;
  } else {
    return `${seconds}s`;
  }
}

const setBadgeText = async (text) => {
  await chrome.action.setBadgeText({text: text ? text : ''});
}

const setActiveBadgeIcon = (tracking) => {
  const path = tracking
    ? {
      16: 'icons/16-2.png',
      48: 'icons/48-2.png',
      128: 'icons/128-2.png',
    }

    : {
      16: 'icons/16.png',
      48: 'icons/48.png',
      128: 'icons/128.png',
    };

  chrome.action.setIcon({path});
}

async function main() {
  const storage = await chrome.storage.local.get(['ClickUpStorage']);
  const user = storage ? storage['ClickUpStorage'] : {};

  if (!user?.token || !user?.teamId || !user?.trackHours) {
    console.log('No token, teamId or user track hours.');
    return;
  }

  API.token = user.token;
  API.teamId = user.teamId;

  console.log(user);

  try {
    const todayTimeEntries = await API.getTodayTimeEntries();

    if (!todayTimeEntries?.data || !todayTimeEntries?.data?.length) {
      console.log('No today time entries');
      await setBadgeText();
      return;
    }

    let totalTrackedTime = todayTimeEntries.data.reduce((n, {duration}) => n + parseInt(duration), 0);

    if (!totalTrackedTime) {
      await setBadgeText();
      return;
    }

    const currentTimeEntry = await API.getCurrentTimeEntry();
    if (currentTimeEntry && currentTimeEntry?.data?.duration) {
      const currentTimeEntryDuration = Math.abs(currentTimeEntry.data.duration);
      totalTrackedTime += currentTimeEntryDuration;

      setActiveBadgeIcon(true);
    } else {
      setActiveBadgeIcon();
    }

    const trackedPercent = Math.floor((totalTrackedTime / user.trackHours) * 100),
      trackedTime = getTime(totalTrackedTime);

    await setBadgeText(trackedPercent + '%');

    let badgeTitle;

    if (trackedPercent > 100) {
      const overtime = getTime(totalTrackedTime - user.trackHours);
      badgeTitle = `Tracked ${trackedTime}, overtime ${overtime}`;
    } else {
      const remainingTime = getTime(user.trackHours - totalTrackedTime + 60000);
      badgeTitle = `Tracked ${trackedTime} - ${remainingTime} more`;
    }

    await chrome.action.setTitle({title: badgeTitle});
  } catch (error) {
    await setBadgeText();
    console.log('Error:', error);
  }
}

(async function () {
  // default badge background and text color
  await chrome.action.setBadgeTextColor({color: '#fff'});
  await chrome.action.setBadgeBackgroundColor({color: '#000'});

  await main();
})();

chrome.alarms.create('get-track-progress', {periodInMinutes: 1});

chrome.alarms.onAlarm.addListener(async alarm => {
  if (alarm.name === 'get-track-progress') {
    console.log('Get track progress');
    await main();
  }
});

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.windows.create({
//     url: '/dist/index.html?win=1',
//     type: 'popup',
//     width: 440,
//     height: 600
//   });
// });
