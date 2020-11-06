import Vue from 'vue'
import App from './App.vue'
import 'bootstrap'
import VueRouter from 'vue-router'
import AddNewTask from "./components/AddNewTask";
import ToDoList from "./components/ToDoList";
Vue.use(VueRouter)

Vue.config.productionTip = false

const routes = [
  {
    path: '/',
    component: AddNewTask,
    alias: '/new'
  },
  {
    path: '/todo-list',
    component: ToDoList
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
