<template>
  <div class="flex flex-col h-screen">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 flex items-center justify-between">
      <h1 class="text-2xl font-bold">G-Scores</h1>
      <button class="md:hidden bg-white text-blue-600 font-bold px-3 py-2 rounded shadow hover:bg-gray-200 transition" @click="sidebarOpen = !sidebarOpen">
        <span v-if="!sidebarOpen">☰</span>
        <span v-else>✕</span>
      </button>
    </header>

    <div class="flex flex-1">
      <!-- Sidebar -->
      <transition name="slide">
        <aside :class="['bg-gradient-to-b from-yellow-400 to-green-400 p-4 text-black', sidebarOpen ? 'fixed inset-0 z-40 w-3/4 max-w-xs' : 'hidden', 'md:static md:z-auto md:w-64 md:block']">
          <div class="mb-6">
            <span class="block text-xl font-bold mb-4">Menu</span>
          </div>
          <nav class="flex flex-col space-y-4">
            <router-link to="/" class="text-left px-2 py-1 rounded transition" exact-active-class="font-bold">Dashboard</router-link>
            <router-link to="/search" class="text-left px-2 py-1 rounded transition" active-class="font-bold">Search Scores</router-link>
            <router-link to="/report" class="text-left px-2 py-1 rounded transition" active-class="font-bold">Reports</router-link>
            <router-link to="/top10" class="text-left px-2 py-1 rounded transition" active-class="font-bold">Top 10 Group A</router-link>
            <router-link to="/settings" class="text-left px-2 py-1 rounded transition" active-class="font-bold">Settings</router-link>
            <button v-if="isAuthenticated" @click="logout" class="mt-6 bg-white text-blue-600 font-bold px-4 py-2 rounded shadow hover:bg-gray-200 transition">Logout</button>
          </nav>
        </aside>
      </transition>

      <!-- Main content -->
      <main class="flex-1 bg-gray-100 p-4 md:p-6 overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isAuthenticated = computed(() => !!localStorage.getItem('token'))
const sidebarOpen = ref(false)

function logout() {
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-enter-to {
  transform: translateX(0);
}
.slide-leave-from {
  transform: translateX(0);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
