<template>
  <div style="max-width: 2000px;min-width: 660px;margin: 0 auto;border-top: #74898a 2px solid;">
    <!--box-shadow: 0px 2px 8px 1px rgba(0,0,0,0.2);-->
    <div id="nav">

      <div id="logo" style="line-height: 80px;height: 80px;float: left;margin-left: 100px;">
        <a href="localhost:8082"><img src="@/assets/logo.jpg" style="height: 50px;display: inline-block"/></a>
        <span style="font-size: 20px;color: #74898a">在线云笔记</span>
      </div>
      <div class="nav-left" v-if="flag">
        <router-link to="/login" type="button" class="btn btn-info" name="login_btn" id="login_btn">登陆</router-link>
        <router-link to="/register" type="button" class="btn btn-default" name="register_btn" id="register_btn">注册
        </router-link>
      </div>
      <div class="nav-left" v-else>
        <router-link to="/home" type="button" class="btn btn-info" name="enter_btn" id="enter_btn">进入网页版</router-link>
      </div>
    </div>

    <div id="lubotu">
      <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators">
          <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
          <li data-target="#carousel-example-generic" data-slide-to="1"></li>
          <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>

        <!-- Wrapper for slides -->
        <div class="carousel-inner" role="listbox">
          <div class="item active" id="banner1">
            <img src="@/assets/banner1-1.jpg" alt="...">
            <div class="banner-text">
               <span class="text-title">随时记录一切

               </span>
              <span class="text-content">
                 无论是点滴灵感、待办清单、或是会议记录、项目资料，印象笔记在手，方便随时记录，永久保存内容。
              </span>
            </div>
          </div>
          <div class="item" id="banner2">
            <img src="@/assets/banner2-1.jpg" alt="..." style="transform:rotate(-15deg);">
            <div class="banner-text">
               <span class="text-title">
                 快速查找所需
               </span>
              <span class="text-content">
                 一个简单的搜索框，就能轻松找到你放进印象笔记的一切。无论是笔记、图片甚至是附件内的文字，云笔记能迅速帮你搜索到任何记忆
              </span>
            </div>
          </div>
          <div class="item" id="banner3">
            <img src="@/assets/banner3-1.jpg" alt="..." style="transform:rotate(15deg);">
            <div class="banner-text">
               <span class="text-title">分享笔记

               </span>
              <span class="text-content">
                 记录了学习生活中的点滴，分享给广大亲朋好用，让大家一起学习认识。
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>

    <div id="function">
      <div id="function1" class="function">
        <img src="@/assets/computer_bg.png" alt=""/>
      </div>
      <div id="function2" class="function">
        <img src="@/assets/synchronous_bg.png" alt=""/>
      </div>
      <div id="function3" class="function">
        <img src="@/assets/cloud_bg.png" alt=""/>
      </div>
      <div id="function4" class="function">
        <img src="@/assets/explore_bg.png" alt=""/>
      </div>
    </div>

    <div id="bottom">
      <ul>
        <li><a href="http://note.youdao.com/about.html" target="_blank">关于我们</a></li>
        |
        <li><a
          href="https://qiyukf.com/client?k=2dac580226b83fb71d8e31c5b40041cf&u=&d=8g9o48vlztdzfzaf9ulh&uuid=swrlbn9jinw9bwxscpgp&gid=0&sid=0&qtype=0&dvctimer=0&robotShuntSwitch=0&hc=0&robotId=0&t=%25E6%259C%2589%25E9%2581%2593%25E4%25BA%2591%25E7%25AC%2594%25E8%25AE%25B0"
          target="_blank">联系我们</a></li>
        |
        <li><a href="http://note.youdao.com/license.html" target="_blank">服务条款</a></li>
        |
        <li><a href="http://corp.163.com/gb/legal.html" target="_blank">隐私协议</a></li>
        |
        <li><a href="http://note.youdao.com/month_license.html" target="_blank">在线云笔记会员包月协议</a></li>
        |
        <li><a href="http://noteyoudao.udesk.cn/hc" target="_blank">帮助</a></li>
        |
        <li><a href="http://note.youdao.com/changelog.html?auto=1" target="_blank">更新日志</a></li>
        |
        <li><a href="https://qiye.yixin.im/" target="_blank">企业易信</a></li>
        |
        <li><a href="http://www.itrust.org.cn/home/index/itrust_certifi/wm/PJ2017012001" target="_blank">网站相关资质证明</a>
        </li>
      </ul>
      <span>
         <span class="glyphicon glyphicon-copyright-mark"></span>仲恺农业工程学院计算科学学院 粤ICP证510550号      违法和不良信息举报电话：188-141-42741
      </span>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
  // import store from '../store';
  export default {
    name: 'Main',
    data() {
      return {
        flag: true
      };
    },
    mounted() {
      this.flag = !this.$store.state.user;
    },
    methods: {}

  };
</script>

<style scoped>
  #nav {
    height: 80px;
    min-width: 660px;
    max-width: 1800px;
    margin: 0 auto;
  }

  .nav-left {
    float: right;
    margin-right: 50px;
    height: 88px;
    line-height: 80px;
  }

  #lubotu {
    height: 500px;
    min-width: 660px;
    max-width: 1800px;
    margin: 0 auto;
    /*background-color: rgb(240, 240, 240);*/
  }

  .carousel-inner .item {
    height: 500px;
    background-size: 100% 500px;
    /*background-image: url("../assets/banner4.jpg");*/
  }

  .carousel-inner #banner1 {
    background-image: url("../assets/banner1.png");
    background-size: 100% 500px;
  }

  .carousel-inner #banner2 {
    background-image: url("../assets/banner2.png");
    background-size: 100% 500px;
  }

  .carousel-inner #banner3 {
    background-image: url("../assets/banner4.jpg");
    background-size: 100% 500px;
  }

  .carousel-inner .item img {
    width: 400px;
    height: 300px;
    position: relative;
    left: 15%;
    top: 100px;
    /*transform:rotate(-15deg);*/
    user-select: none;
  }

  .carousel-inner .item .banner-text {
    position: relative;
    left: 60%;
    top: -100px;
    width: 400px;
    display: inline-block;
    user-select: none;
  }

  .carousel-inner .item .banner-text .text-title {
    display: inline-block;
    font-size: 40px;
    color: #0e6f5c;
  }

  .carousel-inner .item .banner-text .text-content {
    display: inline-block;
    font-size: 20px;
    color: #0d1318;
  }

  .function {
    min-width: 660px;
    max-width: 1800px;
    height: 550px;

  }

  #function {
    min-width: 660px;
    max-width: 1800px;
    /*margin: 0 auto;*/
    text-align: center;
    vertical-align: center;
  }

  #function .function img {
    width: 960px;

    text-align: center;
  }

  #bottom {
    background-color: #95a5a6;
    height: 150px;
    min-width: 660px;
    max-width: 2000px;
    text-align: center;
    padding-top: 50px;

  }

  #bottom li {
    list-style: none;
    display: inline-block;
    margin-left: 5px;
    margin-right: 5px;

  }

  #bottom li a {
    color: #2c3e50;
    text-decoration: none;
  }


</style>
