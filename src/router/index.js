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
<<<<<<< HEAD
      path: '/Coffee',
      name: 'Coffee',
      component: Coffee
    },
    {
=======
>>>>>>> af8569fbf9e8a7fbdfa15eed0bd3a81042325f13
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
