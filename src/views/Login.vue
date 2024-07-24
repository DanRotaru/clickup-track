<template>
  <div class="login">
    <div class="login-wrapper">
      <div class="login-card">
        <svg class="login__logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 357 70" fill="none">
          <g fill-rule="evenodd" clip-path="url(#a)" clip-rule="evenodd">
            <path fill="url(#b)"
                  d="m0 51.14 9.163-7.113c4.899 6.383 10.07 9.392 15.785 9.392s10.795-2.917 15.422-9.3l9.344 6.93C43.001 60.167 34.654 65 24.948 65 15.332 65 6.895 60.167 0 51.14Z"/>
            <path fill="url(#c)"
                  d="M24.948 20.41 8.618 34.544 1.088 25.7 25.039 5l23.77 20.7-7.621 8.753-16.24-14.043Z"/>
          </g>
          <path fill="#000"
                d="M66.32 39.92c0-2.773.6-5.24 1.8-7.4 1.2-2.187 2.867-3.88 5-5.08 2.16-1.227 4.6-1.84 7.32-1.84 3.333 0 6.187.88 8.56 2.64 2.373 1.76 3.96 4.16 4.76 7.2h-7.52c-.56-1.173-1.36-2.067-2.4-2.68-1.013-.613-2.173-.92-3.48-.92-2.107 0-3.813.733-5.12 2.2s-1.96 3.427-1.96 5.88.653 4.413 1.96 5.88c1.307 1.467 3.013 2.2 5.12 2.2 1.307 0 2.467-.307 3.48-.92 1.04-.613 1.84-1.507 2.4-2.68h7.52c-.8 3.04-2.387 5.44-4.76 7.2-2.373 1.733-5.227 2.6-8.56 2.6-2.72 0-5.16-.6-7.32-1.8a13.079 13.079 0 0 1-5-5.08c-1.2-2.16-1.8-4.627-1.8-7.4Zm38.469-15.52V54h-6.84V24.4h6.84Zm8.397 4.96c-1.2 0-2.187-.347-2.96-1.04-.747-.72-1.12-1.6-1.12-2.64 0-1.067.373-1.947 1.12-2.64.773-.72 1.76-1.08 2.96-1.08 1.173 0 2.133.36 2.88 1.08.773.693 1.16 1.573 1.16 2.64 0 1.04-.387 1.92-1.16 2.64-.747.693-1.707 1.04-2.88 1.04Zm3.4 2.32V54h-6.84V31.68h6.84Zm3.597 11.16c0-2.32.466-4.347 1.4-6.08.96-1.733 2.28-3.067 3.96-4 1.706-.933 3.653-1.4 5.84-1.4 2.8 0 5.133.733 7 2.2 1.893 1.467 3.133 3.533 3.72 6.2h-7.28c-.614-1.707-1.8-2.56-3.56-2.56-1.254 0-2.254.493-3 1.48-.747.96-1.12 2.347-1.12 4.16 0 1.813.373 3.213 1.12 4.2.746.96 1.746 1.44 3 1.44 1.76 0 2.946-.853 3.56-2.56h7.28c-.587 2.613-1.827 4.667-3.72 6.16-1.894 1.493-4.227 2.24-7 2.24-2.187 0-4.134-.467-5.84-1.4-1.68-.933-3-2.267-3.96-4-.934-1.733-1.4-3.76-1.4-6.08ZM159.401 54l-6.8-9.36V54h-6.84V24.4h6.84v16.36l6.76-9.08h8.44l-9.28 11.2 9.36 11.12h-8.48Zm17.807-28.08v16.8c0 1.68.413 2.973 1.24 3.88.826.907 2.04 1.36 3.64 1.36s2.826-.453 3.68-1.36c.853-.907 1.28-2.2 1.28-3.88v-16.8h6.84v16.76c0 2.507-.534 4.627-1.6 6.36-1.067 1.733-2.507 3.04-4.32 3.92-1.787.88-3.787 1.32-6 1.32-2.214 0-4.2-.427-5.96-1.28-1.734-.88-3.107-2.187-4.12-3.92-1.014-1.76-1.52-3.893-1.52-6.4V25.92h6.84Zm28.323 8.92c.667-1.04 1.587-1.88 2.76-2.52 1.173-.64 2.547-.96 4.12-.96 1.84 0 3.507.467 5 1.4 1.493.933 2.667 2.267 3.52 4 .88 1.733 1.32 3.747 1.32 6.04s-.44 4.32-1.32 6.08c-.853 1.733-2.027 3.08-3.52 4.04-1.493.933-3.16 1.4-5 1.4-1.547 0-2.92-.32-4.12-.96-1.173-.64-2.093-1.467-2.76-2.48v13.76h-6.84V31.68h6.84v3.16Zm9.76 7.96c0-1.707-.48-3.04-1.44-4-.933-.987-2.093-1.48-3.48-1.48-1.36 0-2.52.493-3.48 1.48-.933.987-1.4 2.333-1.4 4.04 0 1.707.467 3.053 1.4 4.04.96.987 2.12 1.48 3.48 1.48 1.36 0 2.52-.493 3.48-1.48.96-1.013 1.44-2.373 1.44-4.08Zm39.225-16.88v5.48h-7.44V54h-6.84V31.4h-7.44v-5.48h21.72Zm10.273 9.48c.8-1.227 1.8-2.187 3-2.88 1.2-.72 2.533-1.08 4-1.08v7.24h-1.88c-1.707 0-2.987.373-3.84 1.12-.854.72-1.28 2-1.28 3.84V54h-6.84V31.68h6.84v3.72Zm8.909 7.4c0-2.293.427-4.307 1.28-6.04.88-1.733 2.067-3.067 3.56-4 1.493-.933 3.16-1.4 5-1.4 1.573 0 2.947.32 4.12.96 1.2.64 2.12 1.48 2.76 2.52v-3.16h6.84V54h-6.84v-3.16c-.667 1.04-1.6 1.88-2.8 2.52-1.173.64-2.547.96-4.12.96-1.813 0-3.467-.467-4.96-1.4-1.493-.96-2.68-2.307-3.56-4.04-.853-1.76-1.28-3.787-1.28-6.08Zm16.72.04c0-1.707-.48-3.053-1.44-4.04-.933-.987-2.08-1.48-3.44-1.48-1.36 0-2.52.493-3.48 1.48-.933.96-1.4 2.293-1.4 4 0 1.707.467 3.067 1.4 4.08.96.987 2.12 1.48 3.48 1.48 1.36 0 2.507-.493 3.44-1.48.96-.987 1.44-2.333 1.44-4.04Zm10.429 0c0-2.32.466-4.347 1.4-6.08.96-1.733 2.28-3.067 3.96-4 1.706-.933 3.653-1.4 5.84-1.4 2.8 0 5.133.733 7 2.2 1.893 1.467 3.133 3.533 3.72 6.2h-7.28c-.614-1.707-1.8-2.56-3.56-2.56-1.254 0-2.254.493-3 1.48-.747.96-1.12 2.347-1.12 4.16 0 1.813.373 3.213 1.12 4.2.746.96 1.746 1.44 3 1.44 1.76 0 2.946-.853 3.56-2.56h7.28c-.587 2.613-1.827 4.667-3.72 6.16-1.894 1.493-4.227 2.24-7 2.24-2.187 0-4.134-.467-5.84-1.4-1.68-.933-3-2.267-3.96-4-.934-1.733-1.4-3.76-1.4-6.08ZM340.065 54l-6.8-9.36V54h-6.84V24.4h6.84v16.36l6.76-9.08h8.44l-9.28 11.2 9.36 11.12h-8.48Z"/>
          <defs>
            <linearGradient id="b" x1="0" x2="49.755" y1="54.524" y2="54.524" gradientUnits="userSpaceOnUse">
              <stop stop-color="#8930FD"/>
              <stop offset="1" stop-color="#49CCF9"/>
            </linearGradient>
            <linearGradient id="c" x1="1.084" x2="48.757" y1="19.767" y2="19.767" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FF02F0"/>
              <stop offset="1" stop-color="#FFC800"/>
            </linearGradient>
          </defs>
        </svg>

        <label for="API_KEY" class="login__text">Please enter your ClickUp API KEY</label>
        <div class="login-card__section">
          <form @submit.prevent="signIn">
            <input v-model="token" id="API_KEY" class="input" type="text" placeholder="pk_" pattern="^pk_.*"
                   required/>

            <button class="login__btn" :disabled="disabledBtn">
              <span>Sign in</span>
            </button>
          </form>

          <a class="login__link" href="https://clickup.com/api/developer-portal/authentication/#personal-token"
             target="_blank">
            <svg>
              <use xlink:href="#svg-question"/>
            </svg>
            <span>How to generate ClickUp Key?</span>
          </a>
        </div>
      </div>

      <template v-if="userTeams.length > 1">
        <div class="login-team-select">
          <div v-for="team in userTeams" class="login-team-select-card" @click="selectTeam(team.id, team.name)">
            <img :src="'https://placehold.co/400x400/' + team.color + '/white/?text=' + team.name" alt="img"/>
          </div>
        </div>

        <button class="login-team-select-close" @click="userTeams = []"/>
      </template>
    </div>

    <a href="https://github.com/DanRotaru/clickup-track" target="_blank" class="login__github">
      <svg>
        <use xlink:href="#svg-github"/>
      </svg>
    </a>

    <a href="https://dan13.me/?utm_source=clickup-track" target="_blank" class="by">Created with <span>❤️</span> by DanRotaru</a>
  </div>
</template>
<script setup>
import {ref} from 'vue';
import {toast} from 'vue-sonner';

import useUserStore from '@/stores/userStore';
import {getUser, getTeams} from '@/utils/api.js';
import {isAvailableChromeAPIs} from "@/utils/index.js";

const userStore = useUserStore();

const token = ref('');
const disabledBtn = ref(false);

const userTeams = ref([]);
const trackHours = 8 * 60 * 60 * 1000; // 8 hours

const signIn = async () => {
  if (!token.value || !token.value.startsWith('pk_')) {
    toast.error('Token should start with "pk_"');
    return;
  }

  disabledBtn.value = true;

  const userInfo = await getUser(token.value);
  if (userInfo.err === 'Token invalid' || !userInfo?.user?.email) {
    disabledBtn.value = false;
    return toast.error('Invalid API Key');
  }

  userInfo.user.theme = 'light';
  userInfo.user.trackHours = trackHours;
  userInfo.user.weekStartDay = userInfo.user.week_start_day;
  delete userInfo.user.week_start_day;

  userStore.setUser(userInfo.user);

  const teams = await getTeams(token.value);

  disabledBtn.value = false;

  if (teams?.teams && teams?.teams?.length) {
    if (teams?.teams?.length > 1) {
      userTeams.value = [];
      for (const teamItem of teams?.teams) {
        userTeams.value.push({id: teamItem.id, name: teamItem.name, color: teamItem.color.replace('#', '')})
      }
    } else {
      userStore.auth({
        token: token.value,
        teamId: teams.teams[0].id,
        teamName: teams.teams[0].name,
      });

      await sendSignInEventToServiceWorker({token: token.value, teamId: teams.teams[0].id, trackHours});
    }
  } else if (teams.err === 'Token invalid') {
    toast.error('Invalid API Key');
  }
}

const selectTeam = (teamId, teamName) => {
  if (!teamId || !teamName)
    return;

  userStore.auth({
    token: token.value,
    teamId,
    teamName,
  });

  sendSignInEventToServiceWorker({token: token.value, teamId, trackHours});
}

const sendSignInEventToServiceWorker = async ({token, teamId, trackHours}) => {
  if (isAvailableChromeAPIs()) {
    await chrome.runtime.sendMessage({
      task: 'SIGN_IN',
      data: {token, teamId, trackHours}
    });
  }
}
</script>
