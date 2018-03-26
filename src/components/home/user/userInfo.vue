<template>
  <div class="userInfo">

  </div>
</template>

<script>
  import api from "../../../api";


  export default {
    data() {
      return {
        name: "userInfo",
        text: '',
        url:''
      };
    },

    mounted() {
        api.post('/user/getWeather.do',{
          city:'广州'
        }).then((res)=> {
          console.log(res);
          this.url = res.data.data;
        });

    },

    methods: {

    },

  }
  ;
</script>

<style scoped lang="stylus">

</style>
