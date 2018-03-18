<template>
  <div id="login">
    <div id="nav">
      <div id="nav-content">
        <div id="logo" style="line-height: 60px;height: 60px;float: left;">
          <img src="@/assets/logo.jpg" style="height: 50px;display: inline-block;background-color: #66afe9"/>
        </div>
        <div id="home" style="float: right;height: 60px;">
          <router-link to="/"><span class="glyphicon glyphicon-home" style="font-size: 25px;line-height: 60px;"></span>
            <span style="font-size: 15px;margin-left: 10px;">
            首页
          </span>
          </router-link>

        </div>
      </div>
    </div>
    <div id=""
         style="height:100%;min-width: 660px;max-width: 1800px;height: 100%;background-color: #ebebeb;margin: 0 auto">
      <div id="center">
        <div id="form">
      <span class="form-text">
        云笔记账号登录：
      </span>

          <div class="input-group input">
            <span class="input-group-addon" id="sizing-addon1"><span class="glyphicon glyphicon-user"></span></span>
            <input v-model="account" type="text" class="form-control" placeholder="Account"
                   aria-describedby="sizing-addon1">
          </div>
          <div class="input-group input">
            <span class="input-group-addon" id="sizing-addon1"><span
              class="glyphicon glyphicon-eye-close"></span></span>
            <input v-model="password" type="password" class="form-control" placeholder="Password"
                   aria-describedby="sizing-addon1">
          </div>
          <div class="Pass-text">
            <input type="checkbox"/>记住密码
            <a href="">忘记密码？</a>
          </div>
          <div id="btn">
            <input type="button" name="login_btn" @click="login" id="login_btn" class="btn btn-success" value="登陆"/>
            <router-link to="/register" type="button" name="register_btn" id="register_btn" class="btn btn-danger">注册
            </router-link>
          </div>
        </div>

      </div>
      <div id="bottom">
        <span>
         <span class="glyphicon glyphicon-copyright-mark"></span>仲恺农业工程学院计算科学学院 粤ICP证510550号      违法和不良信息举报电话：188-141-42741
      </span>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../api';
  import store from '../store';
  import swal from 'sweetalert';
  export default {
    name: 'Login',
    data() {
      return {
        account: '942364283@qq.com',
        password: '123456',
      };
    },
    methods: {
      login() {//登陆按钮触发事件
        api.post('/user/login.do', {
          account: this.account,
          password: this.password
        }).then((response) => {
          console.log(response);
          if (response.data.status === 0) {
           //登陆成功之后将数据保存到store上面
            store.commit('user',response.data.data);
            swal("登陆成功",'','success').then((res)=>{
              this.$router.push({path: '/home'});
            });
          } else {
            swal("登陆失败",  response.data.msg, "error");
          }
        });
      },
    }
  };
</script>

<style scoped lang="stylus">
  #login
    /*background-color: #ebebeb;*/
    background-color: white;
    /*min-height: 1800px;*/
    /*height :100%;*/
    #nav
      height: 60px;
      min-width: 660px;
      max-width: 1800px;
      background-color: white;
      text-align: center;
      margin: 0 auto;
      #nav-content
        width: 1000px;
        height: 60px;
        margin: 0 auto;
        #home
          a
            padding: 0;
            margin: 0;
            text-decoration: none;
            color: #3498db;
    #center
      min-width: 660px;
      max-width: 1800px;

      margin: 0 auto;
      background-color: #ebebeb;
      padding-top: 50px;
      #form
        width: 600px;
        height: 500px;
        margin: 0 auto;
        box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
        padding-top: 50px;
        .input
          width: 500px;
          margin: 0 auto;
          margin-top: 20px;
        .form-text
          font-size: 22px;
          color: #687b7c;
          margin-left: 50px;
        .Pass-text
          margin-top: 20px;
          width: 500px;
          margin-left: 50px;
          a
            float: right;
        #btn
          width: 500px;
          margin-left: 50px;
          margin-top: 20px;
          #login_btn
            margin-right: 20px;
          #register_btn
            margin-right: 20px;
    #bottom
      min-width: 660px;
      max-width: 1800px;
      height: 80px;
      background-color: rgba(25, 25, 25, 0.2);
      bottom: 0;
      text-align: center;
      padding-top: 30px;
      margin: 0 auto;
      bottom: 0;
      margin-top: 100px;

</style>
