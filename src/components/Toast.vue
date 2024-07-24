<template>
  <div :class="['toast', type, isVisible ? 'visible' : '']">
    <div class="toast-icon">
      <svg>
        <use xlink:href="#svg-error"/>
      </svg>
    </div>
    <div class="toast-info">
      <div class="toast-info__title">{{ title ? title : 'Error' }}</div>
      <div class="toast-info__text">{{ text }}</div>
    </div>
    <div class="toast-close">
      <svg>
        <use xlink:href="#svg-close"/>
      </svg>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';

const props = defineProps(['type', 'title', 'text', 'duration', 'position']);
const isVisible = ref(false);

setTimeout(() => {
  isVisible.value = true;
}, 200);
</script>

<style lang="scss">
.toast {
  --toast-height: 60px;
  --toasts-before: inherit;
  --toasts-initial-transform: 10px;

  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #fff;
  padding: 10px;
  border-radius: 12px;
  box-shadow: 0 4px 12px #0000001a;
  height: var(--toast-height);
  opacity: 0;
  z-index: calc(100 - var(--toasts-before));

  --scale: calc(-1 * var(--toasts-before) * .05 + 1);
  --y: translateY(calc(var(--toasts-before) * 10px + var(--toasts-initial-transform))) scale(var(--scale));
  transform: var(--y);
  transition: .2s ease;
  transition-property: transform, opacity;

  &.visible {
    opacity: 1;
    --toasts-initial-transform: 0px;
  }

  &-icon {
    color: #FF3A30;

    svg {
      width: 24px;
      height: 24px;
    }
  }

  &-close {
    height: 28px;
    width: 28px;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    vertical-align: middle;
    line-height: 0;
    opacity: .5;
    transition: .2s ease;
    transition-property: background-color, opacity;

    &:hover {
      opacity: .8;
      background-color: #f1f1f1;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }

  &-info {
    &__title {
      font-weight: bold;
    }

    &__text {
      font-size: 13px;
      opacity: .9;
    }
  }

}
</style>
