<template>

  <div class="firstStep">

      <span class="text">
        请输入要重置密码的邮箱账号
      </span>

    <el-autocomplete
      class="inline-input email"
      v-model="email"
      :fetch-suggestions="querySearch"
      placeholder="邮箱账号"
      :trigger-on-focus="false"
      @select="handleSelect"
      clearable="true"
    >

    </el-autocomplete>


    <span class="alert">{{alert}}</span>

    <el-button type="success" plain class="successBtn" @click="next()">下一步</el-button>

  </div>


</template>

<script>
  import api from '../../api';
  import store from '../../store';

  export default {
    name: "firstStep",
    data() {
      return {
        email: '',
        alert: '',
      };
    },
    methods: {

      next() {
        if (this.email == null || this.email == '') {
          this.alert = "请输入账号";
        } else {
          api.post('/user/checkEmailIsExist.do', {
            email: this.email
          }).then((res) => {
            console.log("res:",res)
            if (res.data.status === 0) {
              store.commit("firstStepStatus", "success");
              store.commit("secondStepStatus", "process");
              store.commit("user", res.data.data);
              this.$router.push({path: '/updatePass/secondStep'});
            } else {
              this.alert = "不存在该注册账号";
            }
          });
        }
      },

      querySearch(queryString, cb) {
        // 调用 callback 返回建议列表的数据
        var results = this.loadAll(queryString);
        cb(results);
      },


      handleSelect(item) {
        console.log(item);
        console.log(this.email);
      },

      loadAll(queryString) {
        return [
          {"value": queryString + "@163.com", "desc": "网易邮箱"},
          {"value": queryString + "@qq.com", "desc": "QQ邮箱"},
          {"value": queryString + "@126.com", "desc": "网易126邮箱"},
          {"value": queryString + "@gmail.com", "desc": "谷歌邮箱"},
          {"value": queryString + "@163.net", "desc": ""},
          {"value": queryString + "@263.net", "desc": ""},
          {"value": queryString + "@3721.net", "desc": ""},
          {"value": queryString + "@yeah.net", "desc": ""},
          {"value": queryString + "@yahoo.com", "desc": ""},
        ];
      },
    },

    mounted() {
      store.commit("firstStepStatus","process");
      store.commit("secondStepStatus","wait");
      store.commit("thirdStepStatus","wait");

    /*  if (store.state.user === null) {
        store.commit("firstStepStatus", "process");
        store.commit("secondStepStatus", "wait");
        store.commit("thirdStepStatus", "wait");
      } else {
        this.$router.push({path: '/updatePass/secondStep'});
      }*/
    },

    watch: {
      email() {
        this.alert = '';
      }
    }

  };
</script>

<style scoped lang="stylus">
  .firstStep
    width: 400px;
    height: 420px;
    margin: 0 auto;
    padding-top: 50px;
    .text
      display: block;
      width: 400px;
      line-height: 40px;
      height: 40px;
    .email
      width: 400px;
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


</style>
