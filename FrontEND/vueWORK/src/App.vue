<script setup>
import { ref, onMounted } from 'vue'

import NavBar from './components/NavBar.vue'
import Hero from './components/Hero.vue'
import HomeCards from './components/HomeCards.vue'
import LoginForm from './components/LoginForm.vue'
import Courses from './components/Courses.vue'
import Profile from './components/Profile.vue'

const isLoggedIn = ref(false)
const showLoginForm = ref(false)
const hasPressedCourses = ref(false)
const showCourses = ref(false)
const hasPressedProfile = ref(false)
const showProfile = ref(false)

const toggleLoginForm = () => {
  if (!isLoggedIn.value) {
    showLoginForm.value = !showLoginForm.value
  }
}

const toggleCourses = () => {
  if (!hasPressedCourses.value) {
    hasPressedCourses.value = true
  }
  showProfile.value = false
  showCourses.value = !showCourses.value
}

const toggleProfile = () => {
  if (!hasPressedProfile.value) {
    hasPressedProfile.value = true
  }
  showCourses.value = false
  showProfile.value = !showProfile.value
}

const handleLogin = () => {
  isLoggedIn.value = true
  showLoginForm.value = false

  localStorage.setItem('isLoggedIn', 'true')
}

const handleLogout = () => {
  isLoggedIn.value = false
  showLoginForm.value = false
  showProfile.value = false
  hasPressedProfile.value = false
  showCourses.value = false
  hasPressedCourses.value = false
  localStorage.removeItem('isLoggedIn')
}

onMounted(() => {
  const storedLoginState = localStorage.getItem('isLoggedIn')
  if (storedLoginState === 'true') {
    isLoggedIn.value = true
  }
})
</script>

<template>
  <div>
    <NavBar
      :is-logged-in="isLoggedIn"
      @toggle-login-form="toggleLoginForm"
      @logout="handleLogout"
    />
    <Hero :isLoggedIn="isLoggedIn" />
    <div v-if="showLoginForm && !isLoggedIn">
      <LoginForm @login-success="handleLogin" />
    </div>
    <HomeCards
      :isLoggedIn="isLoggedIn"
      @courses-clicked="toggleCourses"
      @profile-clicked="toggleProfile"
    />
    <Courses v-if="showCourses" :hasPressedCourses="hasPressedCourses" />
    <Profile v-if="showProfile" :hasPressedProfile="hasPressedProfile" />
  </div>
</template>
