import Vue from 'vue';


import Router from 'vue-router';
import Login from '../components/login.vue';
import Main from '../components/main.vue';
import Register from '../components/register.vue';
import Home from '../components/home/index';
import Activate from '../components/activate';
// import NewNote from '../components/home/note/newNote';
// import NewNoteBook from '../components/home/notebook/newNoteBook';

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
      // children: [
      //   {
      //     path: 'newnote',
      //     component: NewNote,
      //   },
      //   {
      //     path:'newnotebook',
      //     component:NewNoteBook,
      //   }
      // ]
    },
    {
      path: '/home/note/:id',
      component: Home,
      // children: [
      //   {
      //     path: 'newnote',
      //     component: NewNote,
      //   },
      //   {
      //     path:'newnotebook',
      //     component:NewNoteBook,
      //   }
      // ]
    },
    {
      path: '/user/activate/:code',
      name: 'activate',
      component: Activate
    }
  ]
});


