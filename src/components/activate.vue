<template>
  <div v-if="isLoaded" style="text-align:center;">
    <template v-if="isSuccess">
      <div class="icon" style="color: #09BB07"><span class="glyphicon glyphicon-ok-sign"></span></div>
      <h4>激活成功！
        <router-link to="/login">前往登陆</router-link>
      </h4>
    </template>
    <template v-else>
      <div class="icon" style="color: #F76260"><span class="glyphicon glyphicon-remove-sign"></span></div>
      <h4>激活失败！
        <router-link to="/register">重新注册</router-link>
      </h4>
    </template>
  </div>
</template>

<script>
  import api from '../api';

  export default {
    name: "activate",
    mounted() {
      api.post('/user/activate.do', {code: this.$route.params.code})
        .then((res) => {
          if (!res.data.status) {
            this.isSuccess = true;
          }
          this.isLoaded = true;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    data() {
      return {
        isLoaded: false,
        isSuccess: false
      };
    }
  };
</script>

<style scoped lang="stylus">
  .icon
    margin: 20px auto;
    width: 200px;
    height: 200px;
    line-height: 200px;
    font-size: 200px;
</style>
