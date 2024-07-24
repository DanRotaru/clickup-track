<template>
  <Login v-if="!user.token"/>
  <Main v-else/>
  <Sprites/>

  <Toaster position="top-right" />
</template>

<script setup>
import {storeToRefs} from 'pinia';
import { Toaster } from 'vue-sonner'

import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';
import Sprites from '@/components/Sprites.vue';

import storage from '@/utils/storage';
import useUserStore from '@/stores/userStore';
const userStore = useUserStore();
const {user} = storeToRefs(userStore);

storage.init('ClickUpStorage');

const updateDataFromStorage = () => {
  const userStorage = storage.get('user');

  if (userStorage) {
    userStore.setUser(userStorage);

    if (userStorage.theme === 'dark') {
      document.body.classList.add('dark');
    }
  }
};

updateDataFromStorage();

if (document.location.href.includes('?win=1') || document.location.href.includes('localhost')) {
  document.body.classList.add('window-mode');
}
</script>
