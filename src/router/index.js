import Vue from 'vue'
import Router from 'vue-router'
import api from 'src/api'
import $ from 'jquery'

import Frame from 'src/Frame'
import SinglePage from 'src/SinglePage'

import Signin from 'src/views/Signin'
import Dashboard from 'src/views/Dashboard'
import ProductTypes from 'src/views/ProductTypes'
import ProductTypeDetail from 'src/views/ProductTypeDetail'
import DevelopersManager from 'src/views/DevelopersManager'
import ApplicationsManager from 'src/views/ApplicationsManager'
import ProductDetail from 'src/views/ProductDetail'

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
          path: 'product-types',
          name: 'ProductTypes',
          component: ProductTypes,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'product-types/:id',
          name: 'ProductTypeDetail',
          component: ProductTypeDetail,
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'developers/',
          name: 'DevelopersManager',
          component: DevelopersManager,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'applications/',
          name: 'ApplicationsManager',
          component: ApplicationsManager,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'product/:pid',
          name: 'Product',
          component: ProductDetail,
          props: true,
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

router.beforeEach((to, from, next) => {
  $('.modal').modal('hide')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!api.client.isAuthorized) {
      next({name: 'Signin'})
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
