import Vue from 'vue'
import Router from 'vue-router'
// import api from 'src/api'
// import $ from 'jquery'

import Frame from 'src/Frame'
import SinglePage from 'src/SinglePage'

import Signin from 'src/views/Signin'
import EmailVerifyResult from 'src/views/EmailVerifyResult'
import ResetPwd from 'src/views/ResetPwd'
import Dashboard from 'src/views/Dashboard'

// import DeveloperInfo from 'src/views/DeveloperInfo'

import ProductDefinitions from 'src/views/ProductDefinitions'
import ProductDetail from 'src/views/ProductDetail'
import DeviceManager from 'src/views/DeviceManager'

// import DataDefinitions from 'src/views/DataDefinitions'
// import DataSummary from 'src/views/DataSummary'
// import DataProcessor from 'src/views/DataProcessor'

import UserManager from 'src/views/UserManager'
import FeedbackManager from 'src/views/FeedbackManager'
import MessageManager from 'src/views/MessageManager'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'current-page',
  routes: [
    {
      path: '/',
      component: SinglePage,
      redirect: '/signin',
      children: [
        {
          path: 'signin',
          name: 'Signin',
          component: Signin,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'email-varify',
          name: 'EmailVarifyResult',
          component: EmailVerifyResult,
          meta: {
            requiresAuth: false
          }
        },
        {
          path: 'reset-pwd',
          name: 'ResetPwd',
          component: ResetPwd,
          meta: {
            requiresAuth: false
          }
        }
      ]
    },
    {
      path: '/',
      component: Frame,
      redirect: '/dashboard', // TODO: redirect to dashboard or login, according to login state.
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'manage-devices',
          name: 'ManageDevices',
          component: DeviceManager,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'product-definitions',
          name: 'ProductDefinitions',
          component: ProductDefinitions,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'product-definitions/:pid',
          name: 'ProductDetail',
          component: ProductDetail,
          props: true, // decouple component from route
          meta: {
            requiresAuth: true
          }
        },
        // {
        //   path: 'data-summary',
        //   name: 'DataSummary',
        //   component: DataSummary
        // },
        // TODO: uncomment when ready
        // {
        //   path: 'data-definitions',
        //   name: 'DataDefinitions',
        //   component: DataDefinitions
        // },
        // {
        //   path: 'data-processor',
        //   name: 'DataProcessor',
        //   component: DataProcessor
        // },
        // {
        //   path: 'developer-info',
        //   name: 'DeveloperInfo',
        //   component: DeveloperInfo
        // },
        {
          path: 'user-manager',
          name: 'UserManager',
          component: UserManager,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'feedback-manager',
          name: 'FeedbackManager',
          component: FeedbackManager,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'message',
          name: 'MessageManager',
          component: MessageManager,
          meta: {
            requiresAuth: true
          }
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   $('.modal').modal('hide')
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!api.client.isAuthorized) {
//       next({name: 'Signin'})
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })

export default router
