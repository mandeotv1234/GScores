<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <form class="bg-white p-8 rounded-xl shadow w-full max-w-sm" @submit.prevent="login">
      <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
      <div class="mb-4">
        <label class="block mb-1 font-semibold">Username</label>
        <input v-model="username" type="text" class="w-full border rounded px-3 py-2" required />
      </div>
      <div class="mb-6">
        <label class="block mb-1 font-semibold">Password</label>
        <input v-model="password" type="password" class="w-full border rounded px-3 py-2" required />
      </div>
      <button type="submit" class="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">Login</button>
      <div v-if="error" class="text-red-600 mt-4 text-center">{{ error }}</div>
    </form>
  </div>
</template>

<script setup lang="ts">
import api from '@/services/api'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

async function login() {
  error.value = ''

  try {
    const response = await api.post('auth/login', {
      username: username.value,
      password: password.value
    })
    const token = response?.data?.data?.accessToken
    if (token) {
      localStorage.setItem('token', token)
      router.push('/')
    } else {
      error.value = response?.data?.message 
    }
  } catch (e) {
    error.value = 'Invalid username or password'
  }
}

</script>
