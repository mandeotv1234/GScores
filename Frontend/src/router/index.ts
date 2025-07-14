import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '@/views/MainLayout.vue'
import Dashboard from '@/views/Dashboard.vue'
import SearchStudent from '@/views/Subject/SearchStudent.vue'
import SubjectReport from '@/views/Subject/SubjectReport.vue'
import Top10GroupA from '@/views/Subject/Top10GroupA.vue'
import Settings from '@/views/Settings.vue'
import Login from '@/views/Login.vue'

const requireAuth = (to: any, from: any, next: any) => {
  const token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
}

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: MainLayout,
    beforeEnter: requireAuth,
    children: [
      { path: '', component: Dashboard },
      { path: 'search', component: SearchStudent },
      { path: 'report', component: SubjectReport },
      { path: 'top10', component: Top10GroupA },
      { path: 'settings', component: Settings },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
