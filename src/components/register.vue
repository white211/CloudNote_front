<template>
  <div id="register" style="background-color: #ebebeb;min-width: 660px;height:100%">
    <div id="nav">
      <div id="nav-left">
        <img src="@/assets/res-logo.png" alt=""/>
      </div>
      <div id="nav-right">
        <span>已有账号？去</span>
        <router-link to="/login">登录</router-link>
      </div>
    </div>

    <div id="register-center">
      <div id="form">
        <div class="row">
          <span class="row-text">账号：</span>
          <input v-model="username" type="text" name="username" id="username" placeholder="输入邮箱账号"/>
        </div>
        <div class="row">
          <span class="row-text">密码：</span>
          <input v-model="password" type="password" name="password" id="password" placeholder="密码不少于6位"/>
        </div>
        <div class="row">
          <span class="row-text">确认密码：</span>
          <input class="inputClass" v-model="check_password" type="password" name="check_password" id="check_password"
                 placeholder="再次输入密码"/>
        </div>
        <div class="row">
          <span class="row-text">手机号：</span>
          <input class="inputClass" v-model="telephone" type="text" name="telephone" id="telephone"
                 placeholder="11位手机号"/>
        </div>
        <div id="row">
          <span id="serPass">忘记密码时，可通过手机快速找回密码</span>
        </div>
        <div class="row">
          <span class="row-text">短信验证码：</span>
          <input class="inputClass" v-model="checkNum" type="text" name="checkNum" id="checkNum" placeholder="输入短信验证码"/>
          <input type="button" name="sendCheckNum" class="btn btn-default" id="sendCheckNum"
                 value="获取验证码" @click="sendCheckNum"/>
        </div>
        <div class="row">
          <input type="button" class="btn btn-danger " name="register_btn" id="register_btn"
                 value="立即注册" @click="register_btn"></input>
        </div>
      </div>
    </div>

    <div id="bottom">
      <ul>
        <a href="http://ir.netease.com/phoenix.zhtml?c=122303&p=irol-IRHome" target="_blank">
          <li>About CloudNote</li>
        </a>-
        <a href="http://gb.corp.163.com/gb/about/overview.html" target="_blank">
          <li>公司简介</li>
        </a>-
        <a href="http://gb.corp.163.com/gb/contactus.html" target="_blank">
          <li>联系方式-</li>
        </a>-
        <a href="http://reg.163.com/help/help_oauth2.html?v=20141215" target="_blank">
          <li>OAuth2.0认证</li>
        </a>-
        <a href="http://corp.163.com/gb/job/job.html" target="_blank">
          <li>招聘信息</li>
        </a>-
        <a href="http://help.163.com/" target="_blank">
          <li>客户服务</li>
        </a>-
        <a href="http://gb.corp.163.com/gb/legal.html" target="_blank">
          <li>相关法律</li>
        </a>-
        <a href="http://emarketing.biz.163.com/" target="_blank">
          <li>网络营销</li>
        </a>
      </ul>
      <span>仲恺农业工程学院版权所有 ©1927-2018</span>
    </div>

  </div>
</template>

<script>
  // import axios from 'axios';
  import api from '../api';
  import swal from 'sweetalert';

  export default {
    name: "Register",
    data() {
      return {
        username: '',
        password: '',
        check_password: '',
        telephone: '',
        checkNum: '',
      };
    },
    methods: {
      sendCheckNum() {
        api.post('/user/sendCheckNum.do',{
          telephone:this.telephone
          }
        ).then((response) => {
           swal(response.data.msg);
           console.log(response);
        });
      },
      register_btn(){
         api.post('/user/register.do',{
            email:this.username,
            password:this.password,
            checkNum:this.checkNum,
            telephone:this.telephone
         }).then((response)=>{
           if(response.data.status == 0){
             swal("注册成功","请前往邮箱激活","success");
              this.$router.replace({path:'/login'});
           }else{
             swal(response.data.msg);
           }
           console.log(response);
         })
      },
    }

  };
</script>

<style lang="stylus" scoped>
  #register
    #nav
      width: 1024px;
      margin: 0 auto;
      height: 130px;
      line-height 130px;
      #nav-left
        float: left;
        height: 130px;
        line-height: 130px;
      #nav-right
        float: right;
        line-height: 130px;
        height: 130px;
        font-size: 18px;
        a
          text-decoration: none;
          color: firebrick;
        span
          color: #74898a;
    #register-center
      height: 700px;
      width: 1024px;
      border-radius: 5px;
      box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
      margin: 0 auto;
      background-color white;
      #form
        width: 660px;
        margin: 0 auto;
        padding-top: 50px;
        .row
          height: 50px;
          line-height: 50px;
          margin: 0 auto;
          margin-top: 25px;
          text-align: center;
          .row-text
            width: 130px;
            height: 50px;
            line-height: 50px;
            text-align: right;
            display: inline-block;
            font-size: 20px;
          input
            width: 400px;
            height: 50px;
            display: inline-block;
            font-size: 22px;
            border :1px solid grey;
            &::-webkit-input-placeholder
              font-size: 13px;
              color: #687b7c;
            &:-moz-placeholder
              font-size: 10px;
              color: #687b7c;
            &::-moz-placeholder
              font-size: 10px;
              color: #687b7c;
            &:-ms-placeholder
              font-size: 10px;
              color: #687b7c;
          #checkNum
            width: 200px;
          #sendCheckNum
            width: 180px;
            height: 50px;
            margin-left: 18px;
            text-align: center;
            font-size: 20px;
          #register_btn
            width: 400px;
            height: 50px;
            margin-left: 130px;
            letter-spacing: 20px;
            font-size: 25px;
            vertical-align: middle;
            text-align: center;
        #row
          height: 20px;
          line-height: 20px;
          #serPass
            margin-left: 200px;
            margin-top: 10px;
            height: 20px;
            line-height: 20px;
    #bottom
      height: 100px;
      padding-top: 30px;
      padding-bottom: 30px;
      text-align: center;
      ul
        text-align: center;
        a
          text-decoration: none;
          color: #74898a;
        li
          list-style: none;
          display: inline-block;
      span
        color: #74898a;

</style>
