import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/Login'
import Register from './pages/Register'
import CreateTask from './pages/CreateTask'
import Home from './pages/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/create',
      name: 'createTask',
      component: CreateTask
    },
    {
      alias: '/',
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      alias: '/',
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
