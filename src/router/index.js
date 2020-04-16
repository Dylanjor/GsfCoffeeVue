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
      name: 'Coffee',
      component: Coffee
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    }
    
  ],
  base: '/hot/'
})
