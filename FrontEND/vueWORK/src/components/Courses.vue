<script setup>
import { ref, onMounted } from 'vue'
import Card from './Card.vue'

defineProps({
  hasPressedCourses: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['this-course-clicked'])

const courses = ref([])
const userCourseNum = ref(localStorage.getItem('courseNum') || '')
const selectedCourse = ref(null)

async function fetchCourses() {
  try {
    const response = await fetch('http://localhost:3000/api/courses')
    if (!response.ok) {
      throw new Error(`Ошибка HTTP: ${response.status}`)
    }
    const data = await response.json()
    console.log('Полученные данные:', data)

    courses.value = data.filter((course) => course.course_num === parseInt(userCourseNum.value))
  } catch (error) {
    console.error('Ошибка при получении данных:', error)
  }
}

function selectCourse(course) {
  selectedCourse.value = course
}

function goBack() {
  selectedCourse.value = null
}
onMounted(() => {
  fetchCourses()
})
</script>

<template>
  <div class="p-4">
    <!-- Display list of courses -->
    <div
      v-if="!selectedCourse"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ml-4 mr-4"
    >
      <Card
        v-for="(course, index) in courses"
        :key="index"
        bg="bg-blue-300"
        @click="selectCourse(course)"
        class="cursor-pointer transition duration-300 hover:scale-104"
      >
        <h2 class="text-2xl font-bold text-center">{{ course.course_name }}</h2>
      </Card>
    </div>

    <!-- Display selected course -->
    <div v-else class="max-w-3xl mx-auto p-6 bg-white rounded shadow-lg">
      <button @click="goBack" class="text-blue-500 mb-4">← Назад</button>
      <h2 class="text-3xl font-bold mb-4">{{ selectedCourse.course_name }}</h2>
      <p v-if="selectedCourse.description" class="text-gray-700">
        {{ selectedCourse.description }}
      </p>
      <p v-else></p>
    </div>
  </div>
</template>
