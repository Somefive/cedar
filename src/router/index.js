import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/Hello.vue'
import Editor from '../components/Editor.vue'
import Display from '../components/Display.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/editor',
      name: 'editor',
      component: Editor
    },
    {
      path: '/display',
      name: 'display',
      component: Display
    }
  ]
})
