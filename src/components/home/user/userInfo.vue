<template>
  <div class="userInfo">
    <div class="right">
      <div class="weather">
        <div class="weather-top">
          <span class="city">{{weather.city}}</span>
          <span class="time">{{weather.time | getTime}} 发布</span>
        </div>
        <div class="weather-center">
          <div class="img">
            <img :src="weather.url" alt=""/>
          </div>
          <div class="wendu">
            <span class="number">{{weather.temp}} &#8451;</span>
            <span class="status">{{weather.text}}</span>
          </div>
        </div>
        <span></span>
      </div>

      <div class="cal">

        <vue-event-calendar :events="demoEvents" @monthChanged="monthChange()"
                            @dayChanged="dayChange()"></vue-event-calendar>

      </div>

    </div>

    <div class="left">
      <div class="item">
        <span class="text">邮箱：</span>
        <el-input v-model="user.email" :disabled="true" id="email" class="input"></el-input>
      </div>

      <div class="item">
        <span class="text">用户名：</span>
        <el-input v-model="user.name"  class="input" clearable></el-input>
      </div>

      <div class="item">
        <span class="text">昵称：</span>
        <el-input v-model="user.nickName"  class="input" clearable></el-input>
      </div>

      <div class="item">
        <span class="text">手机号：</span>
        <el-input v-model="user.telephone" :disabled="true"  class="input" ></el-input>
      </div>

      <div class="item">
        <span class="text">生日：</span>
        <el-date-picker
          v-model="user.birthday"
          type="date"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd"
          class="input">
        </el-date-picker>
      </div>

      <div class="item">
        <span class="text">性别：</span>
        <el-radio-group v-model="user.sex">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="0">女</el-radio>
          <el-radio :label="2">保密</el-radio>
        </el-radio-group>
      </div>

      <div class="item">
        <span class="text" >住址：</span>
        <!--<el-input v-model="user.address" class="address" ></el-input>-->
        <el-cascader
          :options="options2"
          @active-item-change="handleItemChange"
          :props="props"
          :placeholder="user.address"
        ></el-cascader>
      </div>
      <div class="item">
        <div class="btn">
          <el-button type="info" plain class="saveUserBtn" @click="save">保存</el-button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import baseService from '../../../Service/baseService';
  import store from '../../../store';

  export default {
    data() {
      return {
        name: "userInfo",
        weather: {
          url: '',
          time: '',
          city: '',
          temp: '',
          text: '',
        },
        demoEvents: [],
        user: {
          email: '',
          telephone:'',
          name:'',
          nickName:'',
          sex:'',
          birthday:'',
          address:''
        },
        options2: [
        {
          label: '江苏',
          cities: []
        },
        {
          label: '浙江',
          cities: []
        }
        ],
        props: {
          value: 'label',
          children: 'cities'
        }
      };
    },

    mounted() {

      baseService.getWeather("香港").then((res) => {
        this.weather.url = "http://oxdypxsie.bkt.clouddn.com/weather" + res.now.code + ".png";
        this.weather.temp = res.now.temperature;
        this.weather.text = res.now.text;
        this.weather.time = res.last_update;
        this.weather.city = res.location.name;
      });

      this.loadUserInfo();
    },

    filters: {
      getTime: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.split("T")[1].split("+")[0];
      }
    },

    methods: {

      //保存用户信息
      save(){

      },

      //记载用户信息显示出来
      loadUserInfo(){
        this.user.email = store.state.user.cn_user_email;
        this.user.name = store.state.user.cn_user_name;
        this.user.nickName = store.state.user.cn_user_nickname;
        this.user.telephone = store.state.user.cn_user_telephone;
        this.user.birthday = store.state.user.cn_user_birthday;
        this.user.sex = store.state.user.cn_user_sex;
        this.user.address = store.state.user.cn_user_address;
      },

      //日历部分
      monthChange(month) {
        console.log(month);
      },

      //日历部分
      dayChange(day) {
        console.log(day);
      },

      //城市列表
      handleItemChange(val) {
        console.log('active item:', val);
        setTimeout(_ => {
          if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
            this.options2[0].cities = [{
              label: '南京'
            }];
          } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
            this.options2[1].cities = [{
              label: '杭州'
            }];
          }
        }, 300);
      },

    },

  }
  ;
</script>

<style scoped lang="stylus">
  .userInfo
    width: 1109px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -554px;
    margin-top: -270px;
    .right
      float: right;
      width: 280px;
      .weather
        //background: linear-gradient(#5b1aff, #32acff);
        width: 280px;
        box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
        height: 180px;
        right: 0;
        padding-left: 10px;
        border-radius: 5px;
        display: block;
        .weather-top
          height: 60px;
          width: 270px;
          line-height: 60px;
          display: block;
          .city
            font-size: 25px;
          .time
            color: rgba(0, 0, 0, 0.5);
        .weather-center
          height: 120px;
          width: 270px;
          .img
            height: 120px;
            line-height: 120px;
            width: 100px;
            float: left;
            text-align: center;
          .wendu
            float: left
            width: 120px;
            height: 120px;
            text-align: center;
            line-height: 60px;
            .number
              font-size: 40px;
              display: block;
              height: 50px;
            /*line-height :100px;*/
            .status
              display: block;
      &:hover
        cursor: pointer
      .cal
        width: 280px;
        height: 400px;
        box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
        display: block;
        margin-top: 20px;
        border-radius: 5px;
    .left
      width: 810px;
      height: 600px;
      float: left;
      box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      padding-left: 20px;
      padding-right: 20px;
      padding-top: 20px;
      .item
        width: 770px;
        height: 50px;
        margin-bottom: 5px;
        .text
          display: inline-block;
          width: 100px;
          height: 50px;
          color: rgba(0, 0, 0, 0.5);
          font-size: 18px;
          line-height: 50px;
          text-align: right;
        .input
          display: inline-block;
          width: 600px;
          height: 50px;
          line-height: 50px;
        .address
          width :200px;
        .btn
          padding-left :50px;
          width :770px;
          .saveUserBtn
            width :600px;
            font-size :18px;
            letter-spacing :20px;


</style>
