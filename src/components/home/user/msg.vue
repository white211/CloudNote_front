<template>
  <div class="msg">
    <div class="type_select">
      <span class="label">反馈类型：</span>
      <el-select v-model="type" filterable placeholder="请选择类型" size="medium">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>

    <div class="text">
      <span class="label">描述：</span>
      <div class="input">
        <el-input
          type="textarea"
          :rows="15"
          placeholder="请输入内容"
          v-model="content"
        >
        </el-input>
      </div>
    </div>

    <div class="btn">
      <el-button type="info" plain class="submitBtn" @click="submit">提交信息</el-button>
    </div>
  </div>
</template>

<script>
  import api from "../../../api";
  import store from "../../../store";
  import swal from "sweetalert";

  export default {
    data() {
      return {
        options: [{
          value: '建议',
          label: '建议'
        }, {
          value: '投诉',
          label: '投诉'
        }],
        type: '',
        content:''
      };
    },

    methods: {

      submit() {
        if(this.type ===''||this.content===''){
            swal({
              title:'',
              icon:'error',
              text:'反馈类型或者内容不能为空'
            });
        }else{
          api.post("/feedback/newFeedBack.do", {
            userId: store.state.user.cn_user_id,
            type:this.type,
            content:this.content
          }).then((res) => {
            if(res.data.status === 0){
              swal({
                text:'我们将以邮箱的方式回复你，请注意查收',
                icon:'success',
                title:'提交成功'
              }).then(res=>{
                this.content ='';
                this.type='';
              });
            }

          });
        }

      }


    }



  };
</script>

<style scoped lang="stylus">
  .msg
    width: 800px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -400px;
    margin-top: -250px;
    padding-top: 50px;
    user-select none;
    /*border :1px solid black;*/
    .label
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: right;
      display: inline-block;
      color: rgba(0, 0, 0, 0.3);
      font-size: 16px;
      vertical-align: top
    .text
      width: 800px;
      height: 330px;
      margin-top: 10px;
      .input
        display: inline-block;
        width: 692px;
    .btn
      width: 800px;
      text-align: right;
      padding: 0;
      margin-top: 10px;
      .submitBtn
        width: 150px;
        font-size: 15px;
</style>
