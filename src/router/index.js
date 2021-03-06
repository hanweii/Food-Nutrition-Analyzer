import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Profile.vue'),
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/foodName',
    name: 'foodName',
    component: () => import( /* webpackChunkName: "login" */ '../views/FoodName.vue')
  },
  {
    path: '/uploadPicture',
    name: 'uploadPicture',
    component: () => import( /* webpackChunkName: "login" */ '../views/UploadPicture.vue')
  },
  {
    path: '/history',
    name: 'history',
    component: () => import( /* webpackChunkName: "login" */ '../views/History.vue')
  },
  {
    path: '/record',
    name: 'record',
    component: () => import( /* webpackChunkName: "login" */ '../views/Record.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard to check for logged in users
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router
