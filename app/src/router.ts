import Vue from 'vue';
import Router from 'vue-router';
import Main from './views/Main.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Main,
    },
    {
      path: '/test',
      name: 'test',
      component: () => import(/* webpackChunkName: "templates" */ './views/Test.vue' ),
    },
    {
      path: '/about/:id',
      name: 'aboutCharacter',
      component:() => import(/* webpackChunkName: "templates" */ './views/About.vue' ),
    },
  ],
});
