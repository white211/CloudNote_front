<template>
  <div class="thirdStep">
     <span class="text">
       请设置
       <span class="email">{{email}}</span>
       的新密码，建议使用数字、字母、字符的组合密码，提高密码安全等级
     </span>

    <el-input type="password" v-model="newPassword" placeholder="请输入新的密码" class="newPassword" clearable
              @blur="checkNewPassword()"></el-input>

    <span class="alert">{{alert1}}</span>

    <el-input type="password" v-model="checkPassword" placeholder="请确认密码" class="checkPassword"
              clearable @blur="checkCheckPassword()"></el-input>

    <span class="alert">{{alert2}}</span>

    <el-button type="success" plain class="confirmBtn" @click="confirm()">确定</el-button>

  </div>

</template>

<script>
  import store from '../../store';
  import api from '../../api';
  import swal from 'sweetalert';

  export default {
    name: "thirdStep",
    data() {
      return {
        email: '',
        alert1: '',
        alert2: '',
        checkPassword: '',
        newPassword: ''
      };
    },
    methods: {

      checkNewPassword() {
        if (this.newPassword === '' || this.newPassword === null) {
          this.alert1 = "新密码不能为空";
          return false;
        } else if (this.newPassword.length > 20 || this.newPassword.length < 6) {
          this.alert1 = "密码长度范围为6到20位";
          return false;
        } else {
          return new Promise((resolve = () => {
          }, reject = () => {
          }) => {
            api.post('/user/checkOldPassword.do', {
              email: store.state.user.cn_user_email,
              oldPassword: this.newPassword
            }).then((res) => {
              if (res.data.status === 0) {
                this.alert1 = "新密码不能与旧密码相同";
                resolve(false);
              } else {
                resolve(true);
              }
            });
          }).then((res) => {
            return res;
          });
        }
      },

      checkCheckPassword() {
        if (this.newPassword === null || this.newPassword === '' || this.alert1 !== '') {
          return false;
        } else {
          if (this.checkPassword === '' || this.checkPassword === null) {
            this.alert2 = "请输入确认密码";
            return false;
          }
          else if (this.newPassword !== this.checkPassword) {
            this.alert2 = "两次密码输入正确";
            return false;
          } else {
            return true;
          }
        }
      },

      confirm() {
        if (this.checkCheckPassword() && this.checkNewPassword()) {
          api.post('/user/forgetResetPassword.do', {
            userId: store.state.user.cn_user_id,
            password: this.newPassword
          }).then((res) => {
            if (res.data.status === 0) {
              store.commit('user', null);
              swal({
                title:'',
                text:'修改成功',
                icon:'success',
                timer:'2000',
                buttons: {
                  confirm: {
                    text: '确定',
                    closeModal: true,
                    value: true,
                    visible: true,
                    className: "",
                  },
                }
              }).then((res)=>{
                 this.$router.push({path: '/login'});
              });
            }else{
               swal({
                 title:'',
                 text:'修改失败',
                 icon:'error',
                 timer:'2000'
               });
            }
          });
        }
      }

    },
    mounted() {

      if (store.state.updatePass.firstStep.status !== "success" || store.state.updatePass.secondStep.status !== "success") {
        this.$router.push({path: '/updatePass/firstStep'});
      }
      else{
        let str = store.state.user.cn_user_email;
        this.email = "***" + str.split("@")[0].substr(-3) + "@" + str.split("@")[1];
      }

    },
    watch: {

      newPassword() {
        this.alert1 = '';
      },

      checkPassword() {
        this.alert2 = '';
      },

    }

  };
</script>

<style scoped lang="stylus">
  .thirdStep
    width: 400px;
    height: 420px;
    margin: 0 auto;
    padding-top: 50px;
    .text
      display: block;
      width: 400px;
      line-height: 20px;
      height: 40px;
      .email
        color: cornflowerblue;
    .confirmBtn
      width: 400px;
      font-size: 18px;
      margin-top: 50px;
    .alert
      width: 400px;
      display: block;
      height: 25px;
      padding: 0;
      font-size: 10px;
      color: red;
      margin-bottom: 0px;

</style>
