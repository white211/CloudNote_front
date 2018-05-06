<template>
  <div id="login">

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

      <!--<div class="Pass-text">-->
      <!--<router-link to="/updatePass">忘记密码？</router-link>-->
      <!--</div>-->

      <div id="btn">

        <el-button type="info" plain name="login_btn" @click="login" id="login_btn">登录</el-button>

      </div>

      <div style="border: 0.5px solid rgba(0,0,0,0.1);margin-top: 50px;width: 500px;margin-left: 50px;"></div>

      <div id="gateRouter">
        <span><router-link to="/register"  id="register_btn">注册账号
          </router-link></span>
        <span>|</span>
        <span><router-link to="/updatePass">忘记密码？</router-link></span>
      </div>

    </div>

  </div>
</template>

<script>
  import api from '../api';
  import store from '../store';
  import swal from 'sweetalert';
  import baseService from '../Service/baseService';

  export default {
    name: 'Login',
    data() {
      return {
        account: '942364283@qq.com',
        password: '654321',
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
            store.commit('user', response.data.data);
            store.commit('token', response.data.data.cn_user_token);
            store.commit("tagList", baseService.getTagList());
            store.commit("noteList", baseService.getNoteList());
            store.commit("noteBookList", baseService.getNoteBookList());
            store.commit("noteTrashList", baseService.findNoteInTrash());
            store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
            store.commit("noteStoreList", baseService.findNoteInStore());
            store.commit("noteBookStoreList", baseService.findNoteBookInStore());
            swal({
              text:"登陆成功",
              title:'',
              icon:'success',
              button:false,
              timer:1500
            }).then((res) => {
              this.$router.push({path: '/home'});
            });
          } else {
            swal("登陆失败", response.data.msg, "error");
          }
        });
      },
    }
  };
</script>

<style scoped lang="stylus">
  #login
    background-color: white;
    #form
      position: absolute;
      width: 600px;
      height: 500px;
      left: 50%;
      top: 50%;
      margin-left: -300px;
      margin-top: -250px;
      box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
      user-select none;
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
          width: 500px;
          height: 45px;
          font-size: 15px;
      #gateRouter
        width :600px;
        text-align :center;
        height :50px;
        line-height :50px;
    #bottom
      position: absolute;
      bottom: 0;
      width: 100%;
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
