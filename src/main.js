// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import marked from 'marked';
import scroll from 'vue-scroll';
Vue.use(scroll);

import 'bootstrap/dist/js/bootstrap';
import './common/styles/bootstrap/flatly.css';
// import './common/slide/jquery-nav-150515164739/js/classie.js';
// import './common/slide/jquery-nav-150515164739/js/mlpushmenu.js';
// import './common/slide/jquery-nav-150515164739/js/modernizr.custom.js';
import 'font-awesome/css/font-awesome.min.css';

import '../static/css/reset.scss';
/*引入github的markdown样式文件*/
import '../static/css/github-markdown.css';
/*引入atom的代码高亮样式文件*/
import '../static/css/atom-one-dark.min.css';

import  '../static/js/highlight.min.js';
import  '../static/js/rangeFn.js';


Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});


