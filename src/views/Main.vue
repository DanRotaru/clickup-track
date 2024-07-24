<!-- TODO: Create select to choose specific time period for the dayTasks -->
<!--   // todo: dynamic value - this month, one month ago, this week, today, one half (six months ago)
// todo: dateEnd also should be dynamic, now is today, need to be editable (today, yesterday, ...)
-->
<template>
  <Nav :user="user" @logout="userStore.logout()" @showSettings="modalShown = true"/>

  <main>
    <div class="current-time" :class="{enabled: currentTimeTask.enabled}">
      <a :href="currentTimeTask.url"
         target="_blank"
         class="current-time__name"
      >{{ currentTimeTask.name }}</a>
      <div class="timer">
        <div class="timer__text">{{ currentTimeTask.durationText }}</div>
        <button v-if="currentTimeTask.enabled" class="timer__btn enabled" @click="stopCurrentTimeEntry"/>
      </div>
    </div>

    <div class="dp">
      <div class="dp-between">
        <div>
          Tasks period
          <span class="dp-hours" v-if="totalTasksTime" tooltip="Total tracked time in this period"
                flow="right">{{ getTime(totalTasksTime) }}</span>
        </div>

        <button class="dp__external" tooltip="Open in window" flow="left" @click="openInNewWindow" v-if="showExternal">
          <svg>
            <use xlink:href="#svg-external"/>
          </svg>
        </button>
      </div>


      <VueDatePicker
        v-model="date"
        ref="datepicker"
        :auto-apply="true"
        :clearable="false"
        range
        position="left"
        :hide-navigation="['year', 'time']"
        :preset-dates="presetDates"
        @update:model-value="updateDatePicker"
        :week-start="user.weekStartDay"
        :disable-year-select="true">

        <template #preset-date-range-button="{ label, value, presetDate }">
        <span
          role="button"
          :tabindex="0"
          @click="presetDate(value)"
          @keyup.enter.prevent="presetDate(value)"
          @keyup.space.prevent="presetDate(value)">
          {{ label }}
        </span>
        </template>

        <template #trigger>
          <div class="dp-input">{{ formattedDate ? formattedDate : 'Last 7 days' }}</div>
        </template>
      </VueDatePicker>
    </div>

    <div class="tasks">

      <div class="task-group" v-if="loadingSkeletonTasks">
        <div class="task-group-info skeleton-task-group-info">
          <div>
            <div class="task-group-info__date skeleton skeleton-task-group-info__date"></div>
            <div class="task-group-info__day skeleton skeleton-task-group-info__day"></div>
          </div>
          <div>
            <div class="task-group-info__time skeleton skeleton-task-group-info__time"></div>
            <div class="skeleton skeleton-task-group-info__progress"></div>
          </div>
        </div>

        <div class="task-group-list">
          <div class="task skeleton-task" v-for="i in 20">
            <div class="skeleton skeleton-task__status"></div>
            <div class="task-wrapper">
              <div class="skeleton skeleton-task__name"></div>
              <div class="skeleton-task-timer">
                <div class="skeleton skeleton-task-timer__text"></div>
                <div class="skeleton skeleton-task-timer__timer"></div>
              </div>
            </div>

            <div class="skeleton skeleton-task__location"></div>
          </div>
        </div>
      </div>

      <div v-else v-for="group in dayTasks" :key="group.date" class="task-group">
        <div class="task-group-info">
          <div class="task-group-info-day-wrapper" @click="toggleExpansion(group)">
            <svg class="task-group-info__icon">
              <use xlink:href="#svg-chevron-down"></use>
            </svg>
            <span class="task-group-info__date">{{ group.date }}</span>
            <h3 class="task-group-info__day">{{ group.day }}</h3>
          </div>
          <div
            :tooltip="group.totalDuration > user.trackHours ? 'Overtime ' + getTime(group.totalDuration - user.trackHours) : 'Remaining ' + getTime(user.trackHours - group.totalDuration + 60000)"
            flow="left">
            <span class="task-group-info__time">{{ getTime(group.totalDuration) }}</span>

            <div class="task-group-info__progress"
                 :class="{'task-group-info__progress--overtime': group.totalDuration > user.trackHours}">
              <div :style="'width: ' + getPercentageOfTrackedTime(group.totalDuration) + '%'"></div>
            </div>
          </div>
        </div>

        <Transition name="task-group-visibility">
          <div v-if="group.expanded" class="task-group-list">
            <template v-for="task in group.tasks" :key="task.id">
              <Task :task="task"
                    :user="user"
                    @setBillable="(billable) => task.billable = billable"
                    @stopTimeTrack="(task) => stopCurrentTimeEntry(task)"
                    @startTimeTrack="(task) => startCurrentTimeEntry(task)"/>
            </template>
          </div>
        </Transition>

      </div>

      <div class="no-tasks" v-if="!dayTasks.length">
        <svg class="no-tasks__img">
          <use xlink:href="#svg-tasks-search"/>
        </svg>
        <h3 class="no-tasks__title">You haven't tracked any time for selected period!</h3>
        <div>
          Selected period: {{ formattedDate }}
          <a v-if="datepicker" @click="datepicker.openMenu()" class="no-tasks__link">Change task period</a>
        </div>
      </div>
    </div>
  </main>

  <Settings :visible="modalShown" @hide="hideModal" :user="user" :userStore="userStore"/>
</template>

<script setup>
import {computed, onMounted, reactive, ref, toRaw} from 'vue';
import {storeToRefs} from 'pinia';
import {format, startOfYear, subDays, subHours, startOfWeek} from 'date-fns';

import {formatDate, getTime} from '@/utils';
import {getCurrentTime, getTimeEntries, startTimeEntry, stopTimeEntry} from '@/utils/api';
import useUserStore from '@/stores/userStore';

import Task from '@/components/Task.vue';
import Nav from '@/components/Nav.vue';
import Settings from '@/components/Settings.vue';

const userStore = useUserStore();
const {user} = storeToRefs(userStore);

const loadingSkeletonTasks = ref(true);
const datepicker = ref(null);
const now = new Date();

const date = ref([subDays(now, 7), now]);

const presetDates = ref([
  {label: 'Last 24 hours', value: [subHours(now, 24), now]},
  {label: 'Last 7 days', value: [subDays(now, 7), now]},
  {label: 'Last 14 days', value: [subDays(now, 14), now]},
  {label: 'Last 30 days', value: [subDays(now, 30), now]},
  {label: 'Last 3 months', value: [subDays(now, 90), now]},
  {label: 'Last 12 months', value: [startOfYear(now), now]},
  {label: 'This week', value: [startOfWeek(now, {weekStartsOn: user.value.weekStartDay}), now]},
]);

const formattedDate = computed(() => {
  if (date.value && date.value.length === 2) {
    const [startDate, endDate] = date.value;
    const startMonth = format(new Date(startDate), 'MMM');
    const startDay = format(new Date(startDate), 'd');
    const endMonth = format(new Date(endDate), 'MMM');
    const endDay = format(new Date(endDate), 'd');

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }
  return '';
});

const dayTasks = ref([]);
const updatedCurrentDayFirstDuration = ref(false);
const currentTimeTask = reactive({
  id: '',
  at: '',
  name: '',
  url: '',
  billable: '',
  duration: 0,
  durationText: '',
  enabled: false
});
const totalTasksTime = ref(null);
const showExternal = !document.location.href.includes('?win=1');

const modalShown = ref(false);

let currentTimeTaskInterval = null;

const updateDatePicker = async () => {
  const [startDate, endDate] = date.value;

  startDate.setHours(0, 0, 0);
  endDate.setHours(23, 59, 59);

  userStore.setUser({tasksStartDate: startDate, tasksEndDate: endDate});
  await getTasksEntries(true);

  if (dayTasks.value.length) {
    dayTasks.value[0].totalDuration += currentTimeTask.duration;
  }
};

const getTasksEntries = async (emptyCurrentTasks = false) => {
  loadingSkeletonTasks.value = true;

  const res = await getTimeEntries({
    teamId: user.value.teamId,
    dateStart: date.value[0].getTime(),
    dateEnd: date.value[1].getTime(),
    token: user.value.token
  });

  if (!res.data) return;

  if (emptyCurrentTasks) dayTasks.value.length = 0;

  const seenDates = new Set();
  const tasksByDate = {};
  let taskIndex = 0;

  res.data.forEach(task => {
    const taskEndDate = formatDate(parseInt(task.end));
    if (!seenDates.has(taskEndDate)) {
      seenDates.add(taskEndDate);
      tasksByDate[taskEndDate] = {tasks: [], totalDuration: 0};
    }

    const taskEntry = {
      at: parseInt(task.at),
      end: parseInt(task.end),
      name: task.task?.name || 'No task selected',
      url: task.task_url,
      billable: task.billable,
      status: task.task?.status,
      duration: parseInt(task.duration),
      durationText: getTime(parseInt(task.duration)),
      location: task.task_location,
      enabled: false,
      n: ++taskIndex
    };

    const existingTaskIndex = tasksByDate[taskEndDate].tasks.findIndex(t => t.id === task.task?.id);

    if (existingTaskIndex !== -1) {
      const existingTask = tasksByDate[taskEndDate].tasks[existingTaskIndex];
      existingTask.at = taskEntry.at;
      existingTask.status = taskEntry.status;
      existingTask.billable = taskEntry.billable;
      existingTask.duration += taskEntry.duration;
      existingTask.durationText = getTime(existingTask.duration);
      existingTask.n = taskIndex++;
    } else {
      taskEntry.id = task.task?.id || '1';
      tasksByDate[taskEndDate].tasks.push(taskEntry);
    }

    tasksByDate[taskEndDate].totalDuration += taskEntry.duration;
  });

  const getTodayOrYesterdayText = (dateText, day) => {
    const today = formatDate(new Date(), true);
    const yesterday = formatDate(new Date(Date.now() - 86400000), true);

    if (today === dateText) return 'Today';
    if (yesterday === dateText) return 'Yesterday';
    return day;
  };

  dayTasks.value = Object.keys(tasksByDate).map(date => ({
    date: date.split(' ').slice(1).join(' '),
    day: getTodayOrYesterdayText(date.split(' ').slice(1).join(' '), date.split(' ')[0]),
    tasks: tasksByDate[date].tasks,
    totalDuration: tasksByDate[date].totalDuration,
    expanded: true
  })).reverse();

  totalTasksTime.value = null;
  dayTasks.value.forEach(group => {
    totalTasksTime.value += group.totalDuration;
    group.tasks.sort((a, b) => b.n - a.n);
  });

  console.log({tasks: toRaw(dayTasks.value)});
  loadingSkeletonTasks.value = false;
};

const setCurrentTimeTaskTimer = (duration) => {
  currentTimeTask.enabled = true;
  currentTimeTask.duration = Math.abs(duration);
  currentTimeTask.durationText = getTime(duration, true);

  if (currentTimeTaskInterval) clearInterval(currentTimeTaskInterval);

  currentTimeTaskInterval = setInterval(() => {
    if (dayTasks.value.length && !updatedCurrentDayFirstDuration.value) {
      dayTasks.value[0].totalDuration += currentTimeTask.duration;

      updatedCurrentDayFirstDuration.value = true;
    }

    currentTimeTask.duration += 1000;
    currentTimeTask.durationText = getTime(currentTimeTask.duration, true);

    if (dayTasks.value.length) {
      dayTasks.value[0].totalDuration += 1000;
    }
  }, 1000);
};

const getCurrentTaskEntry = async () => {
  if (!user.value.token || !user.value.teamId) {
    return;
  }

  const res = await getCurrentTime({
    teamId: user.value.teamId,
    token: user.value.token
  });

  if (res.data) {
    const taskData = res.data.task || {id: Date.now(), name: 'No task selected'};
    currentTimeTask.id = taskData.id;
    currentTimeTask.name = taskData.name;
    currentTimeTask.url = res.data.task_url;
    currentTimeTask.at = res.data.at;
    currentTimeTask.billable = res.data.billable;
    setCurrentTimeTaskTimer(Math.abs(res.data.duration));

    const currentTaskInfo = getTaskById(currentTimeTask.id);
    if (currentTaskInfo) {
      currentTaskInfo.enabled = true;
    }
  } else {
    currentTimeTask.id = null;
    currentTimeTask.enabled = false;

    if (currentTimeTaskInterval) clearInterval(currentTimeTaskInterval);
  }
};

const getTaskById = (id) => {
  for (const day of dayTasks.value) {
    const task = day.tasks.find(task => task.id === id);
    if (task) return task;
  }
  return null; // Return null if no task with the given id is found
};

const startCurrentTimeEntry = async (task) => {
  const taskId = task.id, taskName = task.name, billable = task.billable;

  if (currentTimeTask.enabled) {
    await stopCurrentTimeEntry(currentTimeTask);
  }

  const res = await startTimeEntry({
    taskId,
    teamId: user.value.teamId,
    billable,
    token: user.value.token
  });

  if (res.data) {
    task.enabled = true;
    console.log(task);

    const taskInfo = getTaskById(task.id);
    taskInfo.enabled = true;

    currentTimeTask.enabled = true;
    currentTimeTask.id = taskId;
    currentTimeTask.name = taskName;
    currentTimeTask.duration = 0;
    currentTimeTask.durationText = getTime(0, true);

    clearInterval(currentTimeTaskInterval);

    currentTimeTaskInterval = setInterval(() => {
      currentTimeTask.duration += 1000;
      currentTimeTask.durationText = getTime(currentTimeTask.duration, true);
    }, 1000);
  }
};

const stopCurrentTimeEntry = async (task) => {
  currentTimeTask.enabled = false;
  task.enabled = false;

  clearInterval(currentTimeTaskInterval);

  const res = await stopTimeEntry({
    teamId: user.value.teamId,
    token: user.value.token
  });

  if (res.data) {
    await getTasksEntries(true);
  } else {
    console.log('Error stopping timer');
  }
};

const openInNewWindow = () => {
  const url = location.href + '?win=1',
    width = 430,
    height = 600,
    left = Math.round(screen.width - width - 50),
    top = 50;

  if (typeof chrome !== 'undefined' && typeof chrome.windows !== 'undefined') {
    chrome.windows.create({
      url,
      type: 'popup',
      focused: true,
      width,
      height,
      top,
      left
    });

    return;
  }

  window.open(url, 'popUpWindow', `width=${width},height=${height},top=${top},left=${left}`);
}

const hideModal = () => {
  modalShown.value = false;
  document.body.classList.add('no-scroll');

  setTimeout(() => {
    document.body.classList.remove('no-scroll');
  }, 100);
}

(async () => {
  if (user.value.tasksStartDate && user.value.tasksEndDate) {
    date.value = [new Date(user.value.tasksStartDate), new Date(user.value.tasksEndDate)];
  }

  await Promise.all([
    getTasksEntries(),
    getCurrentTaskEntry()
  ]);

  const FETCH_CURRENT_TASK_INTERVAL = 30 * 1000; // in seconds
  setInterval(getCurrentTaskEntry, FETCH_CURRENT_TASK_INTERVAL);
})();

const toggleExpansion = (group) => {
  group.expanded = !group.expanded;
};

const getPercentageOfTrackedTime = (duration) => Math.round((duration / user.value.trackHours) * 100);
</script>
