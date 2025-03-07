<script setup lang="ts">
defineProps({
  title: {
    type: String,
  },
  fillColor: {
    type: String,
    default: "currentColor"
  },
  size: {
    type: Number,
    default: 24
  }
});

const emit = defineEmits(['click']);
</script>

<template>
  <span v-bind="$attrs" :aria-hidden="title ? undefined : 'true'" :aria-label="title" class="icon" role="img"
    @click="emit('click', $event)">
    <svg :fill="fillColor" class="icon__svg" :width="size" :height="size" viewBox="0 0 512 512">
      <path
        d="M452,64H60c-15.6,0-28,12.7-28,28.3v327.4c0,15.6,12.4,28.3,28,28.3h392c15.6,0,28-12.7,28-28.3V92.3   C480,76.7,467.6,64,452,64z M348.9,261.7c-3-3.5-7.6-6.2-12.8-6.2c-5.1,0-8.7,2.4-12.8,5.7l-18.7,15.8c-3.9,2.8-7,4.7-11.5,4.7   c-4.3,0-8.2-1.6-11-4.1c-1-0.9-2.8-2.6-4.3-4.1L224,215.3c-4-4.6-10-7.5-16.7-7.5c-6.7,0-12.9,3.3-16.8,7.8L64,368.2V107.7   c1-6.8,6.3-11.7,13.1-11.7h357.7c6.9,0,12.5,5.1,12.9,12l0.3,260.4L348.9,261.7z">
        <title v-if="title">{{ title }}</title>
      </path>
    </svg>
  </span>
</template>
