<script setup>
import { onMounted, ref } from 'vue'

defineProps({
  hasPressedProfile: {
    type: Boolean,
    default: false,
  },
})

const name = ref('')
const course = ref('')
const email = ref('')
const role = ref('')

onMounted(() => {
  name.value = localStorage.getItem('userName') || 'Нет даннных'
  course.value = localStorage.getItem('courseNum') || 'Нет даннных'
  email.value = localStorage.getItem('userEmail') || 'Нет даннных'
  role.value = localStorage.getItem('userRole') || 'Нет даннных'
})
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex items-start justify-center p-4">
    <div
      class="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl h-96 flex flex-col justify-between mt-8"
    >
      <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ name }}</h2>
      <div>
        <p class="text-gray-700"><strong>Курс:</strong> {{ course }}</p>
        <p class="text-gray-700"><strong>Почта:</strong> {{ email }}</p>
        <p class="text-gray-700"><strong>Роль:</strong> {{ role }}</p>
      </div>
    </div>
  </div>
</template>
