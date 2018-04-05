<template>
  <div class="updatePass">
    <span class="text">更新密码</span>
    <div class="updata-form">
      <div class="item">
        <label for="oldPass">旧密码:</label>
        <input type="password" name="oldPass" id="oldPass" v-model="oldPass" @blur="checkOldPass"/>
      </div>

      <div class="item">
        <label for="newPass">新密码:</label>
        <input type="password" name="newPass" id="newPass" v-model="newPass" @blur="checkNewPass"/>
      </div>

      <div class="item">
        <label for="checkPass">确认新密码:</label>
        <input type="password" name="checkPass" id="checkPass" v-model="checkPass" @blur="CheckCheckPass"/>
      </div>

      <div class="item">
        <input type="button" value="确认修改" class="changePass" @click="changPass"/>
      </div>
    </div>
  </div>
</template>

<script>
  import swal from 'sweetalert';
  import api from '../../../api';
  import store from '../../../store';

  export default {
    data() {
      return {
        name: "updatePass",
        oldPass: [],
        newPass: [],
        checkPass: [],
        flag: false
      };
    },
    methods: {

      checkOldPass() {
        if (this.oldPass.length === 0) {
          swal({
            title: '',
            text: '请输入旧密码',
            timer: 3000,
            icon: 'error'
          });
        } else {
          api.post('/user/checkOldPassword.do', {
            email: store.state.user.cn_user_email,
            oldPassword: this.oldPass
          }).then((res) => {
            if (res.data.status !== 0) {
              swal({
                title: '',
                text: '旧密码错误',
                icon: 'error',
                timer: 3000
              });
            } else {
              console.log(res);
            }
          });
        }
      },

      checkNewPass() {

        if (this.oldPass === this.newPass && this.newPass !== null) {
          swal({
            title: '',
            text: '新密码不能与旧密码相同',
            timer: 3000,
            icon: 'error'
          }).then((res) => {
            this.newPass = [];
          });
        }
        if (this.newPass.length < 6 || this.newPass.length > 20) {
          swal({
            title: '',
            text: '新密码长度不能小于6或者大于20',
            timer: 3000,
            icon: 'error'
          });
        }
      },

      CheckCheckPass() {
        if (this.checkPass !== this.newPass && this.checkPass !== null && this.newPass !== null) {
          swal({
            title: '',
            text: '两次密码不一致',
            timer: 3000,
            icon: 'error'
          });
        }
      },

      changPass() {
        if (this.oldPass.length === 0 || this.newPass.length === 0 || this.checkPass.length === 0) {
          swal({
            title: '提交失败',
            text: '',
            timer: 3000,
            icon: 'error'
          });
        } else {
          api.post('/user/resetPassword.do', {
            email: store.state.user.cn_user_email,
            oldPassword: this.oldPass,
            newPassword: this.newPass
          }).then((res) => {
            if (res.data.status === 0) {
              swal({
                title: '修改成功',
                text: ' 请重新登陆',
                icon: 'success',
                timer: 3000
              }).then((res) => {
                store.commit('user', null);
                this.$router.push('/login');
              });
            }
          });
        }
      }

    },

  };
</script>

<style scoped lang="stylus">
  .updatePass
    width: 800px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -250px;
    padding-top: 50px;
    box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
    span
      font-size: 25px;
      color: rgba(0, 0, 0, 0.35);
      width: 800px;
      display: block
      padding-left: 50px;
      padding-bottom: 50px;
    .item
      width: 800px;
      height: 100px;
      label
        width: 100px;
        text-align: right
        user-select :none;
      input[type=password]
        width: 600px;
        height: 50px;
        line-height: 50px;
        border: 1px solid #dce4ec
        border-radius: 5px;
        font-size: 25px
        padding-left: 10px;
        &:focus
          border-radius: 5px;
      input[type=button]
        float: right;
        width: 200px;
        height: 45px;
        margin-right: 100px;
        font-size: 22px;
        text-align: center;
        line-height: 45px;
        border-radius: 5px;
        background-color: rgb(163, 221, 130)
        color: white
        &:hover
          cursor: pointer;
          background-color: rgb(152, 217, 100);

</style>
