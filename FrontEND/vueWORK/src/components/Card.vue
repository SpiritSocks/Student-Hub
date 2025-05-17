<script setup>
import { defineProps } from 'vue'

defineProps({
  bg: {
    type: String,
    default: 'bg-gray-100',
  },
})
</script>

<template>
  <div :class="`${bg} p-10 rounded-lg shadow-lg transition duration-350 hover:shadow=lg`">
    <slot></slot>
  </div>
</template>
