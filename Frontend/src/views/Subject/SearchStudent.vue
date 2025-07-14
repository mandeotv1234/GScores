<template>
  <div class="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">
    <h1 class="text-2xl font-bold text-gray-800 text-center">Search Scores</h1>

    <!-- Input -->
    <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
      <input
        v-model="regNumber"
        type="text"
        inputmode="numeric"
        pattern="[0-9]*"
        class="flex-1 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-xl px-4 py-2"
        placeholder="Enter registration number"
        @input="onInput"
      />
      <button
        @click="search"
        :disabled="!regNumber.trim()"
        class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-xl transition w-full sm:w-auto"
        :class="{ 'opacity-50 cursor-not-allowed': !regNumber.trim() }"
      >
        Search
      </button>
    </div>

    <!-- Input Warning -->
    <div v-if="inputWarning" class="text-red-600 text-sm mt-2">{{ inputWarning }}</div>

    <!-- Error Alert -->
    <Alert v-if="errorMessage" variant="error" title="Error" :message="errorMessage" />

    <!-- Result -->
    <div v-if="score" class="mt-4 space-y-4">
      <div class="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h2 class="text-xl font-semibold text-blue-700 mb-2">Language Code: {{ score.foreignLanguageCode }}</h2>
        <div class="grid grid-cols-2 gap-4 text-gray-700">
          <div v-for="item in filteredSubjects" :key="item.key" class="flex justify-between">
            <span>{{ item.value }}:</span>
            <span class="font-medium">{{ item.score }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import api from '@/services/api';
import Alert from '@/components/ui/Alert.vue';
import type { StudentScore } from '@/types/StudentScore';

const regNumber = ref('');
const inputWarning = ref('');

function onInput(e: Event) {
  const target = e.target as HTMLInputElement;
  const original = target.value;
  const filtered = original.replace(/[^0-9]/g, '');
  if (original !== filtered) {
    inputWarning.value = 'Only numbers are allowed.';
  } else {
    inputWarning.value = '';
  }
  target.value = filtered;
  regNumber.value = filtered;
}
import { computed } from 'vue';
const score = ref<StudentScore | null>(null);
const filteredSubjects = computed(() => {
  if (!score.value) return [];
  return Object.entries(subjectLabels)
    .filter(([key]) => (score.value as Record<string, any>)[key] != null)
    .map(([key, value]) => ({
      key,
      value,
      score: (score.value as Record<string, any>)[key]
    }));
});
const errorMessage = ref('');

const subjectLabels: Record<string, string> = {
  math: 'Math',
  literature: 'Literature',
  foreignLanguage: 'Foreign Language',
  physics: 'Physics',
  chemistry: 'Chemistry',
  biology: 'Biology',
  history: 'History',
  geography: 'Geography',
  civicEducation: 'Civic Education',
};

async function search() {
  errorMessage.value = '';
  try {
    const res = await api.get(`/exam-results/${regNumber.value}`);
    score.value = res.data.data;
  } catch (err: any) {
    score.value = null;
    errorMessage.value = err?.response?.data?.message || 'Student not found!';
  }
}
</script>
