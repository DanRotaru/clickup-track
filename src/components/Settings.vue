<template>
  <div class="modal settings" :class="{visible: visible}">
    <div class="modal-overlay" @click="$emit('hide')"></div>
    <div class="modal-dialog">
      <div class="modal-title">
        <svg>
          <use xlink:href="#svg-settings"/>
        </svg>
        <span>Settings</span>
      </div>

      <div class="modal-body">
        <div class="options">
          <div class="option">
            <div class="option__title">Appearance</div>
            <div class="select-options">
              <span class="select-options__bg"></span>
              <label class="select-options-item">
                <svg>
                  <use xlink:href="#svg-sun"/>
                </svg>
                <span>
                  Light
                </span>
                <input type="radio" class="first" :checked="user.theme === 'light'" name="theme-select" @click="setTheme('light')"/>
              </label>

              <label class="select-options-item">
                <svg>
                  <use xlink:href="#svg-moon"/>
                </svg>
                <span>
                  Dark
                </span>
                <input type="radio" class="second" :checked="user.theme === 'dark'" name="theme-select" @click="setTheme('dark')"/>
              </label>
            </div>
          </div>

          <div class="option">
            <div class="option__title">Track Hours</div>
            <div class="option-input">
              <select name="trackHours" id="trackHours" @change="e => setTrackHours(e)">
                <option
                  v-for="i in 12"
                  :value="i * 3600 * 1000"
                  :selected="i * 3600 * 1000 === user.trackHours"
                >{{ i }} hour{{i === 1 ? '' : 's'}} {{ i === 8 ? '(default)' : '' }}</option>
              </select>
            </div>
            <div class="option__hint">How many daily hours you need to track?</div>
          </div>

          <div class="option">
            <div class="option__title">First day of the week</div>
            <div class="option-input">
              <select name="firstWeekDay" id="firstWeekDay" @change="e => setFirstWeekDay(e)">
                <option value="1" :selected="user.weekStartDay === 1">Monday</option>
                <option value="0" :selected="user.weekStartDay === 0">Sunday</option>
              </select>
            </div>
            <div class="option__hint">By default this setting is loaded from ClickUp Profile Settings</div>
          </div>

<!--          <div class="option">-->
<!--            <div class="option__title">Current task fetch interval</div>-->
<!--            <div class="option-input">-->
<!--              <select name="fetchInterval" id="fetchInterval">-->
<!--                <option value="10">10 seconds</option>-->
<!--                <option value="30">30 seconds</option>-->
<!--                <option value="60">1 minute</option>-->
<!--                <option value="60">1 minute</option>-->
<!--              </select>-->
<!--            </div>-->
<!--            <div class="option__hint">How often make request to get current time, please consider <a href="https://clickup.com/api/developer-portal/rate-limits/" target="_blank">ClickUp Rate Limits</a></div>-->
<!--          </div>-->

          <div class="option">
            <div class="option__title">Shortcut</div>
            <div class="option-input">
              <div class="keyboard">
                <div class="keyboard">
                  <div class="keyboard-key">Alt</div>
                  <span>+</span>
                </div>
                <div class="keyboard">
                  <div class="keyboard-key">C</div>
                </div>
              </div>
            </div>
            <div class="option__hint">Extension activation shortcut</div>
          </div>

          <div class="option">
            <a href="https://dan13.me/?utm_source=clickup-track" target="_blank" class="option__by">Created with <span>❤️</span> by DanRotaru</a>
          </div>
        </div>

        <a href="https://github.com/DanRotaru/clickup-track" target="_blank" class="options-github">
          <svg>
            <use xlink:href="#svg-github"/>
          </svg>
        </a>
      </div>

    </div>
  </div>
</template>

<script setup>
const props = defineProps(['visible', 'user', 'userStore']);
const emits = defineEmits(['hide', 'updateTrackHours']);

const setTheme = (theme) => {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    props.userStore.setUser({theme: 'dark'});
  } else {
    document.body.classList.remove('dark');
    props.userStore.setUser({theme: 'light'});
  }
}

const setTrackHours = (e) => {
  const trackHours = parseInt(e.target.value);
  props.userStore.setUser({trackHours: trackHours});
}

const setFirstWeekDay = (e) => {
  const weekStartDay = parseInt(e.target.value);
  props.userStore.setUser({weekStartDay});
}
</script>
