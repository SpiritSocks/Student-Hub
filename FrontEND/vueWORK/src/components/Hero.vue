<script setup>
defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <section class="bg-gray-700 py-20 mb-4">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div class="text-center">
        <h1 v-if="isLoggedIn" class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Добро пожаловать!
        </h1>
        <h1 v-else class="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
          Пожалуйста, войдите в систему
        </h1>
        <p v-if="isLoggedIn" class="my-4 text-xl text-white">Вы успешно вошли в систему</p>
        <p v-else class="my-4 text-xl text-white">
          Для доступа к курсам необходимо войти в систему
        </p>
      </div>
    </div>
  </section>
</template>
