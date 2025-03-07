<script setup lang="ts">
interface Option {
  [key: string]: any;
}

const isOpen = defineModel<boolean>({ default: false });

defineProps({
  options: {
    type: Array<Option | string>,
    required: true,
  },
  displayKey: {
    type: String,
  }
});

const emit = defineEmits(['update:isOpen']);
const handleAction = (option: any) => {
  if (option.disabled) {
    return;
  }
  if (option.action) {
    option.action(option);
  }
  emit('update:isOpen', false);
};
</script>

<template>
  <ul class="base-dropdown-menu" :class="{ active: isOpen }">
    <li class="base-dropdown-menu__option" :class="{ disabled: typeof option != 'string' && option.disabled }"
      v-for="(option, index) in options" :key="index" @click="handleAction(option)">
      <template v-if="$slots.option">
        <slot name="option" :option="(option as any)" />
      </template>
      <template v-else-if="(typeof option === 'string') || (option instanceof String)">
        {{ option }}
      </template>
      <template v-else-if="displayKey && option.hasOwnProperty(displayKey)">
        {{ option[displayKey] }}
      </template>
    </li>
  </ul>
</template>
