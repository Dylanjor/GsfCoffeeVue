import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
const Coffee = () => import('../components/Coffee.vue')
const Register = () => import('../components/Register.vue')

export default new Router({
  mode: 'history',
  routes: [
    
    {
      path: '/',
      name: 'Register',
      component: Register
    },
    {
      path: '/Coffee',
      name: 'Coffee',
      component: Coffee
    }
    
  ],
  base: '/hot/'
})
