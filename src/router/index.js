import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/vids/:id',
    name: 'Watch',
    component: ()=> import('../views/VideoWatch.vue')
  },
  {
    path:'/Plists',
    name:'Playlists',
    component: () => import('../views/PlayView.vue')
  },
  {
    path:'/playlist/:id',
    name:'Playlist',
    component: () => import('../views/PlayList.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
