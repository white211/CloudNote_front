import Vue from 'vue';

import Router from 'vue-router';
import Login from '../components/login.vue';
import Main from '../components/main.vue';
import Register from '../components/register.vue';
import Home from '../components/home/index';
import Activate from '../components/activate';
import Editor from '../components/home/editor';
import UpdatePass from '../components/home/user/updatePass';
import UserInfo from '../components/home/user/userInfo';
import Msg from '../components/home/user/msg';
import ShareNote from '../components/home/note/shareNote';
import UpdatePassNoLogin from '../components/updatePass';
import FirstStep from '../components/updatePassStep/firstStep'
import SecondStep from '../components/updatePassStep/secondStep';
import ThirdStep from '../components/updatePassStep/thirdStep'

Vue.use(Router);


export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      name: 'Main',
      component: Main
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/register',
      name: 'register',
      component: Register
    },

    {
      path: '/home',
      component: Home,
      redirect: '/home/newNote',
      children: [
        {
          path: 'newNote',
          component: Editor,
        },
        {
          path: 'newNote/:id',
          component: Editor,
        },
        {
          path: '/user/userInfo',
          component: UserInfo
        },
        {
          path: '/user/updatePass',
          component: UpdatePass
        },
        {
          path: '/user/msg',
          component: Msg
        },

      ]
    },

    {
      path: '/updatePass',
      component: UpdatePassNoLogin,
      name: 'updatePassNoLogin',
      redirect:'/updatePass/firstStep',
      children: [{
        path: '/updatePass/firstStep',
        component: FirstStep
      },
        {
          path:'/updatePass/secondStep',
          component:SecondStep
        },
        {
          path:'/updatePass/thirdStep',
          component:ThirdStep
        }

      ]
    },

    {
      path: '/user/activate/:code',
      name: 'activate',
      component: Activate
    },

    {
      path: '/note/shareNote/:userId/:id',
      name: 'shareNote',
      component: ShareNote
    }

  ]
});


