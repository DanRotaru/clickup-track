const API_BASE = 'https://api.clickup.com/api/v2';

const getTeams = async (token) => {
  const request = await fetch(API_BASE + '/team/', {
    headers: {Authorization: token}
  });

  return await request.json();
}

const getUser = async (token) => {
  const request = await fetch(API_BASE + '/user/', {
    headers: {Authorization: token}
  });

  return await request.json();
}

const getCurrentTime = async ({teamId, token}) => {
  if (!teamId || !token)
    return null;

  const request = await fetch(`${API_BASE}/team/${teamId}/time_entries/current?include_location_names=true`, {
    headers: {Authorization: token}
  });

  return await request.json();
}

const getTimeEntries = async ({teamId, token, dateStart, dateEnd}) => {
  const request = await fetch(`${API_BASE}/team/${teamId}/time_entries?start_date=${dateStart}&end_date=${dateEnd}&include_location_names=true`, {
    headers: {Authorization: token}
  });

  return await request.json();
}

const stopTimeEntry = async ({teamId, token}) => {
  const request = await fetch(`${API_BASE}/team/${teamId}/time_entries/stop`, {
    headers: {Authorization: token},
    method: 'POST'
  });

  return await request.json();
}

const startTimeEntry = async ({teamId, token, taskId, billable}) => {
  const request = await fetch(`${API_BASE}/team/${teamId}/time_entries/start?custom_task_ids=true`, {
    headers: {Authorization: token, 'Content-Type': 'application/json'},
    body: JSON.stringify({
      tid: taskId,
      billable
    }),
    method: 'POST'
  });

  return await request.json();
}

export {
  getTeams,
  getUser,
  getCurrentTime,
  getTimeEntries,
  stopTimeEntry,
  startTimeEntry
}
