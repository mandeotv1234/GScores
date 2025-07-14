<template>
    <div class="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow">
      <h1 class="text-2xl font-bold text-gray-800 mb-6 text-center">Top 10 Students - Group A (Math - Physics - Chemistry)</h1>
  
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm text-left text-gray-700 border">
          <thead class="bg-gray-100 text-gray-600 uppercase text-xs">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Registration Number</th>
              <th class="px-4 py-3">Math</th>
              <th class="px-4 py-3">Physics</th>
              <th class="px-4 py-3">Chemistry</th>
              <th class="px-4 py-3 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(student, index) in top10"
              :key="student.registrationNumber"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 font-medium text-gray-800">{{ index + 1 }}</td>
              <td class="px-4 py-3">{{ student.registrationNumber }}</td>
              <td class="px-4 py-3">{{ student.math }}</td>
              <td class="px-4 py-3">{{ student.physics }}</td>
              <td class="px-4 py-3">{{ student.chemistry }}</td>
              <td class="px-4 py-3 text-right font-semibold text-blue-600">
                {{ student.totalScore?.toFixed(2) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import api from '@/services/api';
  import type { StudentScore } from '@/types/StudentScore';
  
  const top10 = ref<StudentScore[]>([]);
  

onMounted(async () => {
  const res = await api.get('/exam-results/top10-group-a');
  // Backend wraps data in { data: { ...fields } } or { data: { groupAStudentScores: [...] } }
  top10.value = res.data.data.groupAStudentScores || [];
});
  
// getTotal function removed, using totalScore from backend
  </script>
  