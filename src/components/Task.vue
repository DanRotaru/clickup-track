<template>
  <div class="task">
    <div class="task__status" v-if="task.status">
      <div class="lh-0 text-transform-none" tooltip="Task status" flow="right">
        <svg class="status-circle" :class="'status-circle--' + getStatusClass(task.status.status, task.status.type)">
          <use xlink:href="#svg-status"/>
        </svg>
      </div>
      <span>{{ task.status.status }}</span>

      <!--      <div tooltip="Save to bookmarks" flow="right">-->
      <!--        <svg class="task__bookmark" :class="'active' + getStatusClass(task.status.status)">-->
      <!--          <use xlink:href="#svg-bookmark"/>-->
      <!--        </svg>-->
      <!--      </div>-->
    </div>
    <div class="task-wrapper">
      <a class="task__name" :href="task.url" target="_blank">{{ task.name }}</a>
      <div class="timer">
        <div class="timer__text">{{ task.durationText }}</div>
        <button v-if="task.enabled" class="timer__btn enabled" @click="$emit('stopTimeTrack', task)"/>
        <button v-else class="timer__btn" @click="$emit('startTimeTrack', task)"/>
      </div>
    </div>
    <div class="task__location" v-if="task.location && task.location?.list_id">
      <div class="task__billable" :class="{not: !task.billable}" @click="$emit('setBillable', !task.billable)"
           :tooltip="task.billable ? 'Billable task' : 'Non-billable task'" flow="right">$
      </div>
      <span>
        <a :href="`https://app.clickup.com/${user.teamId}/v/o/s/${task.location.space_id}`"
           target="_blank" :title="task.location.space_name">{{ task.location.space_name }}</a>
        &middot;
        <a :href="`https://app.clickup.com/${user.teamId}/v/li/${task.location.list_id}/${task.location.folder_id}`"
           target="_blank" :title="task.location.list_name">{{ task.location.list_name }}</a>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['task', 'user']);

const getStatusClass = (statusText, statusType) => {
  const conditions = [
    {
      check: statusText.includes('progress'),
      class: 'in-progress'
    },
    {
      check: statusText.includes('complete') || statusType === 'closed',
      class: 'complete'
    },
    {
      check: statusText.includes('approval') || statusType === 'done',
      class: 'approval'
    },
    {
      check: statusText.includes('stuck'),
      class: 'stuck'
    },
    {
      check: statusText.includes('review') || statusText.includes('test'),
      class: 'review'
    },
    {
      check: statusText.includes('backlog') || statusType === 'open',
      class: 'backlog'
    },
    {
      check: statusText.includes('to do') || statusText.includes('todo') || statusType === 'unstarted',
      class: 'todo'
    },
  ];

  return conditions.find(condition => condition.check)?.class;
}
</script>
