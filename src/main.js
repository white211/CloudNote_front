// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Marked from 'marked';

//boostrap的相关配置
import 'bootstrap/dist/js/bootstrap';
import './common/styles/bootstrap/flatly.css';
//font-awesome的相关配置
import 'font-awesome/css/font-awesome.min.css';

// oven-mdEditor markdown的相关配置
import '../static/css/reset.scss';
/*引入github的markdown样式文件*/
import '../static/css/github-markdown.css';
/*引入atom的代码高亮样式文件*/
import '../static/css/atom-one-dark.min.css';

import '../static/js/highlight.min.js';
import '../static/js/rangeFn.js';

import mavonEditor from 'mavon-editor';
import 'mavon-editor/dist/css/index.css';

import clipboard from 'vue-clipboard2';

// use
Vue.use(mavonEditor);
Vue.use(clipboard);

Vue.config.productionTip = false;

Vue.filter('mark2html', (markdown) => {
  return Marked(markdown);
});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});


