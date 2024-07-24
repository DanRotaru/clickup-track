import {reactive} from 'vue'
import {defineStore} from 'pinia'
import storage from '@/utils/storage';

export default defineStore('userStore', () => {
  const user = reactive({
    id: null,
    color: null,
    email: null,
    initials: null,
    profilePicture: null,
    username: null,

    token: null,
    teamId: null,
    teamName: null,

    tasksStartDate: null,
    tasksEndDate: null,
  });

  const updateUserStorage = () => {
    storage.set('user', JSON.parse(JSON.stringify(user)));
  }

  const setUser = (userInfo) => {
    for (const [key, value] of Object.entries(userInfo)) {
      user[key] = value;
    }
    // console.log(user);

    updateUserStorage();
  }

  const auth = ({token, teamId, teamName}) => {
    user.token = token;
    user.teamId = teamId;
    user.teamName = teamName;

    updateUserStorage();
  }

  const logout = () => {
    for (const [key] of Object.entries(user)) {
      user[key] = null;
    }

    storage.clear();
    document.body.classList.remove('dark');
  }

  return {user, setUser, auth, logout}
})
