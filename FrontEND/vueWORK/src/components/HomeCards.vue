<script setup>
import { defineProps, defineEmits } from 'vue'
import Card from '@/components/Card.vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['profile-clicked', 'courses-clicked'])
</script>

<template>
  <section class="py-4">
    <div class="container lg:container m-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 p-4 rounded-lg">
        <template v-if="isLoggedIn">
          <!-- Student Profile Button -->
          <Card
            bg="bg-green-300"
            @click="$emit('profile-clicked')"
            class="cursor-pointer transition duration-300 hover:scale-105"
          >
            <h2 class="text-2xl font-bold text-center">Профиль студента</h2>
          </Card>
          <!-- Courses Button -->
          <Card
            bg="bg-blue-300"
            @click="$emit('courses-clicked')"
            class="cursor-pointer transition duration-300 hover:scale-105"
          >
            <h2 class="text-2xl font-bold text-center">Дисциплины</h2>
          </Card>
        </template>
      </div>
    </div>
  </section>
</template>
