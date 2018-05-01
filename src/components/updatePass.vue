<template>

  <div class="updatePass">

    <div class="nav">
      <span class="fa fa-pencil logo"></span>
      <router-link to="/updatePass/firstStep">
        <span class="home">
           重置密码
        </span>
      </router-link>

      <div class="nav-right">
        <router-link to="/login">
          <span class="login-span">登录</span>
        </router-link>
        <router-link to="/register">
          <span class="register-span">注册</span>
        </router-link>
      </div>
    </div>

    <div class="main">

      <el-steps :active="1" finish-status="success" simple>

        <el-step title="步骤 1 输入账号" :status="firstStepStatus"></el-step>

        <el-step title="步骤 2 安全验证" :status="secondStepStatus"></el-step>

        <el-step title="步骤 3 修改密码" :status="thirdStepStatus"></el-step>

      </el-steps>

      <router-view/>

    </div>

    <div class="footer">
      <ul>
        <a href="http://gb.corp.163.com/gb/about/overview.html" target="_blank">
          <li>公司简介</li>
        </a>&nbsp|&nbsp
        <a href="#">
          <li>云笔记帐号中心</li>
        </a>&nbsp|&nbsp
        <a href="#">
          <li>帐号中心公众号</li>
        </a>&nbsp|&nbsp
        <a href="#">
          <li>云笔记帐号管家</li>
        </a>&nbsp|&nbsp
        <a href="#">
          <li>云笔记靓号</li>
        </a>&nbsp|&nbsp
        <a href="#">
          <li>帮助中心</li>
        </a>
      </ul>

      <span>
仲恺农业工程学院版权所有 ©1927-2018
      </span>

    </div>

  </div>


</template>

<script>
  import store from '../store'
  export default {
    name: "updatePass",
    data() {
      return {
        active: 0,
      };
    },

    methods: {

    },


    mounted(){

    },

    // updated(){
    //   this.store.commit("user",null);
    // },
    computed:{
      firstStepStatus(){
       return  store.state.updatePass.firstStep.status;
      },
      secondStepStatus(){
       return store.state.updatePass.secondStep.status;
      },
      thirdStepStatus(){
        return store.state.updatePass.thirdStep.status;
      }
    },

  };

</script>

<style scoped lang="stylus">

  .updatePass
    background-color: rgba(0, 0, 0, 0.05);
    min-width: 1213px;
    padding-top: 100px;
    position: relative;
    height: 100%;
    min-height: 100vh
    .nav
      height: 60px;
      width: 100%;
      max-width: 1800px;
      line-height: 60px;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin-left: auto;
      margin-right: auto;
      border-bottom: 1px #e7e7e7 solid;
      z-index: 100;
      background-color: white
      .logo
        color: #2dbe60;
        font-size: 50px;
        height: 60px;
        line-height: 60px;
        margin-left: 10%;
        float: left
      .home
        float: left
        width: 100px;
        height: 60px;
        line-height: 60px;
        margin-left: 8%;
        padding: 0
        text-align: center
        font-size: 20px;
        &:hover
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.03);
      .nav-right
        float: right;
        margin-right: 10%;
        .login-span
          color: rgba(0, 0, 0, 0.4);
          margin-right: 30px;
          font-size: 18px;
          &:hover
            cursor: pointer;
        .register-span
          display: inline-block
          text-align: center;
          border: 1px solid #2dbe60;
          border-radius: 15px;
          width: 100px;
          height: 40px;
          line-height: 40px;
          &:hover
            background-color: rgba(47, 255, 152, 0.1);
    .main
      width: 1213px;
      height: 500px;
      margin: auto;
      margin-top: 0px;
      background-color: white;
      margin-bottom: 100px;
    .footer
      border-top: 0.5px solid rgba(0, 0, 0, 0.5);
      position: relative;
      height: 100px;
      width: 100%;
      bottom: 0px;
      left: 0px;
      text-align :center;
      padding-top :30px;
      padding-bottom :30px;
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
