<script setup>
defineProps({
  isLoggedIn: {
    type: Boolean,
    default: false,
  },
})
</script>
<template>
  <nav class="bg-gray-700 border-b border-gray-500">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div class="flex flex-1 items-center justify-start">
          <a class="flex flex-shrink-0 items-center mr-4" href="#">
            <span class="hidden md:block text-white text-2xl font-bold ml-2">СДО 2</span>
          </a>
        </div>
        <div class="flex items-center">
          <div class="flex space-x-2">
            <!-- Login Button (только когда не в аккаунте) -->
            <button
              v-if="!isLoggedIn"
              @click="$emit('toggle-login-form')"
              class="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              Войти
            </button>
            <!-- Logout Button (только когда в аккаунте) -->
            <button
              v-if="isLoggedIn"
              @click="$emit('logout')"
              class="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
