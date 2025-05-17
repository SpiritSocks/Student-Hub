<script setup>
import { ref } from 'vue'

defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['login-success'])

const email = ref('')
const password = ref('')

const handleSubmit = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_: email.value,
        password_: password.value,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      console.error('Login failed:', errorData)
      alert('Ошибка входа. Проверьте Email и пароль.')
      return
    }

    const data = await response.json()

    if (data.error) {
      console.error('Login failed:', data.error)
      alert('Ошибка входа. Проверьте Email и пароль.')
      return
    }

    const { name, course_num, access_level } = data.user

    emit('login-success', data.user)

    localStorage.setItem('userName', name)
    localStorage.setItem('courseNum', course_num)
    localStorage.setItem('userEmail', email.value)
    localStorage.setItem('userRole', access_level)
  } catch (error) {
    console.error('Login failed:', error)
    alert('Ошибка входа. Проверьте верность данных или наличие подключение к серверу.')
  }
}
</script>

<template>
  <div class="bg-gray-700 py-20 mb-4 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <h1 class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">Вход в систему</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mt-8">
          <label for="email" class="block text-sm font-medium text-white">Email</label>
          <input
            id="email"
            v-model="email"
            type="email"
            class="mt-1 p-2 w-full max-w-md rounded-lg border border-gray-500"
            required
          />
        </div>
        <div class="mt-4">
          <label for="password" class="block text-sm font-medium text-white">Пароль</label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="mt-1 p-2 w-full max-w-md rounded-lg border border-gray-500"
            required
          />
        </div>
        <button
          type="submit"
          class="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full max-w-md"
        >
          Войти
        </button>
      </form>
    </div>
  </div>
</template>
