<template>

  <div class="updatePass">

    <span class="text">更新密码</span>

    <div class="updata-form">

      <div class="item radioBtn">

        <el-radio-group v-model="PasswordType" @change="typeChange" fill="#67C23A" text-color="#FFFFFF">

          <el-radio-button label="1">登录密码</el-radio-button>

          <el-radio-button label="2">阅读密码</el-radio-button>

        </el-radio-group>

      </div>

      <div class="item">
        <label for="oldPass">旧密码:</label>
        <input type="password" :placeholder="Type" name="oldPass" id="oldPass" v-model="oldPass"
               @blur="blurOnPassWord"/>
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
        flag: false,
        PasswordType: '1',
        Type: ''
      };
    },
    methods: {
      /**
       * 单选按钮触发事件
       * */
      typeChange(label) {
        this.oldPass = '';
        this.newPass = '';
        this.checkPass = '';
        if (label === '2' && store.state.user.cnNoteReadPassword !== '') {
          this.Type = "初次修改，初始密码为‘111111’";
        } else {

          this.Type = '';
        }
      },

      /**
       * 验证旧密码按钮触发事件
       * */
      blurOnPassWord() {
        if (this.PasswordType === '1') {
          this.checkOldPass('/user/checkOldPassword.do', 1);
        } else if (this.PasswordType === '2') {
          this.checkOldPass('/user/checkOldPassword.do', 2);
        }
      },

      checkOldPass(url, type) {
        if (this.oldPass.length === 0) {
          swal({
            title: '',
            text: '请输入旧密码',
            timer: 3000,
            icon: 'error'
          });
        } else {
          api.post(url, {
            userId: store.state.user.cn_user_id,
            oldPassword: this.oldPass,
            type: type
          }).then((res) => {
            if (res.data.status !== 0) {
              swal({
                title: '',
                text: '旧密码错误',
                icon: 'error',
                timer: 3000
              }).then((res) => {
                this.oldPass = '';
              });
            } else {
              console.log(res);
            }
          });
        }
      },
      /**
       * blur验证新密码
       * */
      checkNewPass() {

        if (this.oldPass === this.newPass && this.newPass !== null) {
          swal({
            title: '',
            text: '新密码不能与旧密码相同',
            timer: 2000,
            icon: 'error'
          }).then((res) => {
            this.newPass = [];
          });
        }
        if (this.newPass.length < 6 || this.newPass.length > 20) {
          swal({
            title: '',
            text: '新密码长度不能小于6或者大于20',
            timer: 2000,
            icon: 'error'
          }).then((res) => {
            this.newPass = [];
          });
        }

        if (this.newPass === '111111') {
          swal({
            title: '',
            text: '新密码太简单',
            timer: 2000,
            icon: 'error'
          }).then((res) => {
            this.newPass = [];
          });
        }
      },

      /**
       * blur验证第二次密码
       * */
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

      /**
       * 确认按钮触发事件
       * */
      changPass() {
        if (this.oldPass.length === 0 || this.newPass.length === 0 || this.checkPass.length === 0) {
          swal({
            title: '提交失败',
            text: '',
            timer: 3000,
            icon: 'error'
          });
        } else {
          if (this.PasswordType === '1') {
            api.post('/user/resetPassword.do', {
              userId: store.state.user.cn_user_id,
              oldPassword: this.oldPass,
              newPassword: this.newPass,
              type: 1
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
          } else if (this.PasswordType === '2') {
            api.post('/user/resetPassword.do', {
              userId: store.state.user.cn_user_id,
              oldPassword: this.oldPass,
              newPassword: this.newPass,
              type: 2
            }).then((res) => {
              if (res.data.status === 0) {
                store.commit("user", res.data.data);
                swal({
                  title: '',
                  text: ' 修改成功',
                  icon: 'success',
                  timer: 3000
                }).then((res) => {
                  this.$router.push({path: '/home/newNote'});
                });
              }
            });
          }
        }
      },

    },

  };

</script>

<style scoped lang="stylus">
  .updatePass
    max-width: 800px;
    height: 500px;
    padding-top: 50px;
    margin: auto;
    /*margin-top :50px;*/
    -webkit-box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
    box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
    position :absolute;
    left :0;
    right :0;
    bottom :0;
    top:0;
    //width: 800px;
    //height: 500px;
    //position: absolute;
    //left: 50%;
    //top: 50%;
    //margin-left: -400px;
    //margin-top: -250px;
    //padding-top: 50px;
    //box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
    span
      font-size: 25px;
      color: rgba(0, 0, 0, 0.35);
      width: 800px;
      display: block
      padding-left: 50px;
      padding-bottom: 20px;
    .item
      width :100%;
      height: 80px;
      label
        width: 100px;
        text-align: right
        user-select: none;
      input[type=password]
        width :80%;
        height: 45px;
        line-height: 45px;
        border: 1px solid #dce4ec
        border-radius: 5px;
        font-size: 15px
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
    .radioBtn
      padding-left: 50px;

</style>
