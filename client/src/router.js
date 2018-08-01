import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import SinglePost from './views/DetailPost.vue'
import Travel from './views/Travel.vue'
import Foods from './views/Foods.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/post/:id',
      name: 'post',
      component: SinglePost
    },
    {
      path: '/travel',
      name: 'travel',
      component: Travel
    },
    {
      path: '/foods',
      name: 'foods',
      component: Foods
    }
  ]
})
