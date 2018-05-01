<template>
  <div class="secondStep">

    <span class="text">
      点击获取验证码，短信将发送至安全手机{{telephone}}
    </span>

    <el-input v-model="checkNum" placeholder="请输入短信验证码" class="checkNum"></el-input>

    <el-button type="success" class="getCheckNumBtn" @click="getCheckNum()">{{BtnText}}</el-button>

    <span class="alert">{{alert}}</span>

    <el-button type="success" plain class="successBtn" @click="next()">下一步</el-button>

    <!--<el-alert-->
    <!--title="成功提示的文案"-->
    <!--type="success"-->
    <!--center-->
    <!--show-icon>-->
    <!--</el-alert>-->

  </div>

</template>

<script>
  import api from '../../api';
  import store from '../../store';

  export default {
    name: "secondStep",
    data() {
      return {
        checkNum: '123456',
        telephone: '',
        alert: '',
        BtnText: ''
      };
    },

    mounted() {

      let tel = store.state.user.cn_user_telephone;
      this.telephone = tel.substr(0, 3) + "********";
      this.BtnText = '获取验证码';

      if (store.state.updatePass.firstStep.status !== "success") {
        this.$router.push({path: '/updatePass/firstStep'});
      }

    },

    methods: {

      isIntNum(val) {
        let regPos = /^\d+$/; // 非负整数
        if (regPos.test(val)) {
          return true;
        } else {
          return false;
        }
      },

      next() {
        if (this.checkNum == '' || this.checkNum == null) {
          this.alert = "请输入验证码";
        } else if (!this.isIntNum(this.checkNum) || this.checkNum.length !== 6) {
          console.log(this.isIntNum(this.checkNum));
          this.alert = "验证码格式出错，必须是六位数字";
        } else {
          store.commit('secondStepStatus', "success");
          store.commit('thirdStepStatus', "process");
          this.$router.push({path: '/updatePass/thirdStep'});
          // api.post('/user/checkTelephoneCheckNum.do', {
          //   checkNum: this.checkNum,
          //   telephone: store.state.user.cn_user_telephone
          // }).then((res) => {
          //   if (res.data.status === 0) {
          //     store.commit('secondStepStatus', "success");
          //     store.commit('thirdStepStatus', "process");
          //     this.$router.push({path: '/updatePass/thirdStep'});
          //   } else {
          //     this.alert = '验证码错误';
          //   }
          // });
        }

      },

      getCheckNum() {
        api.post('/user/sendCheckNum.do', {
          telephone: store.state.user.cn_user_telephone
        }).then((res) => {
          if (res.data.status === 0) {
            this.BtnText = '重发';
          } else {

          }
        });
      }

    },

    watch: {
      checkNum() {
        this.alert = '';
      }
    }
  };
</script>

<style scoped lang="stylus">
  .secondStep
    width: 400px;
    height: 420px;
    margin: 0 auto;
    padding-top: 50px;
    .text
      display: block;
      width: 400px;
      line-height: 40px;
      height: 40px;
    .checkNum
      width: 250px;
      display: inline-block;
    .getCheckNumBtn
      width: 140px;
      display: inline-block;
    .alert
      margin-bottom: 50px;
      width: 400px;
      display: block;
      height: 30px;
      padding: 0;
      font-size: 10px;
      color: red;
    .successBtn
      width: 400px;
      font-size: 18px;
      margin-left: 0px;

</style>
