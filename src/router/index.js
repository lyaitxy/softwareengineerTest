import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue')
  },
   {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/',
    //重定向
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: 'mycourse',
        name: 'MyCourse',
        component: () => import('@/views/home/mycourse/index.vue'),
      },
      {
        path: 'coursedetail/:course_id',
        name: 'CourseDetail',
        component: () => import('@/views/home/coursedetail/index.vue'),
        children: [{
          path: 'addwork',
          name: 'AddWork',
          component: () => import('@/views/home/coursedetail/addwork/index.vue')
        },
        {
          path: 'createSign',
          name: 'CreateSign',
          component: () => import('@/views/home/coursedetail/createSign/index.vue')
        },
        {
          path: 'workdetail/:work_id',
          name: 'WorkDetail',
          component: () => import('@/views/home/coursedetail/workdetail/index.vue')
        },
        {
          path: 'statistiaclData',
          name: 'StatistiaclData',
          component: () => import('@/views/home/coursedetail/statistiacldata/index.vue')
        }
      
      ]
      }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router
