import { createRouter, createWebHistory } from 'vue-router'
import GenerateTitle from '../views/GenerateTitle.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: GenerateTitle,
    },
    {
      path: "/cloud",
      name: "cloud",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/WordCloud.vue"),
    },
    {
      path: "/classify",
      name: "classify",
      component: () => import("../views/ClassifyNews.vue"),
    },
  ],
});

export default router
