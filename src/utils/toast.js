import {createApp, h, reactive} from 'vue';
import Toast from '@/components/Toast.vue';

const toastsInfo = reactive({
  numbers: 0,
  duration: 5000,
})


const showToast = ({title, text, type = 'info'}) => {
  const toastApp = createApp({
    render() {
      return h(Toast, {title, text, type});
    }
  });

  const toastsWrapper = document.querySelector('.toasts');
  const toastItem = document.createElement('li');
  toastItem.style.setProperty('--toasts-before', toastsInfo.numbers + '');

  toastsInfo.numbers += 1;

  toastItem.classList.add('toast-wrapper');
  toastsWrapper.appendChild(toastItem);
  toastApp.mount(toastItem);

  setTimeout(() => {
    // toastItem.querySelector('.toast').classList.remove('visible');

    // setTimeout(() => {
    //   toastApp.unmount();
    //   toastsWrapper.removeChild(toastItem);
    // }, 300)
  }, toastsInfo.duration);
};

export default showToast;
