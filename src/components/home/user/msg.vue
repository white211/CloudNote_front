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

    <div class="msg_file">
      <span class="label">上传图片：</span>
      <div class="img_block">
        <label for="openfile">
          <div class="uploadIMG">
            <img v-bind:src="imageUrl" alt="" class="imageUrl" title="点击上传图片"/>
            <span class="fa fa-plus add" v-if="!imageUrl"></span>
          </div>
          <input type="file" id="openfile" class="img_btn" @change="uploadFile($event)" />
        </label>
      </div>
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
  import axios from 'axios'

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
        content: '',
        imageUrl: '',
      };
    },

    methods: {

      submit() {
        if (this.type === '' || this.content === '') {
          swal({
            title: '',
            icon: 'error',
            text: '反馈类型或者内容不能为空',
            button:false,
            timer:2000
          });
        } else {
          api.post("/feedback/newFeedBack.do", {
            userId: store.state.user.cn_user_id,
            type: this.type,
            content: this.content,
            imageUrl:this.imageUrl
          }).then((res) => {
            if (res.data.status === 0) {
              swal({
                text: '我们将以邮箱的方式回复你，请注意查收',
                icon: 'success',
                title: '提交成功',
                timer: 2000
              }).then(res => {
                this.content = '';
                this.type = '';
                this.imageUrl = '';
              });
            }

          });
        }

      },

      uploadFile(e) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', e.target.files[0]);
        formdata.append('userId', store.state.user.cn_user_id);
        axios({
          url: 'http://127.0.0.1:8080/user/updataAvatar.do',
          method: 'post',
          data: formdata,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':store.state.token
          },
        }).then((res) => {
          if (res.data.status === 0) {
            var url = res.data.data;
            this.imageUrl = url;
          }
        });
        console.log(e.target.files[0]);
      },
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
    margin-top: -300px;
    padding-top: 50px;
    user-select none;

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

    .msg_file
      .img_block
        height: 150px;
        width: 150px;
        border: 0.5px dashed rgba(0, 0, 0, 0.3);
        display: inline-block;
        overflow :hidden;
        padding :0.5px;
        .img_btn
          display: none;
        .uploadIMG
          height :148px;
          width :148px;
          text-align :center;
          vertical-align :center;
          &:hover
            cursor :pointer;
          .imageUrl
            height :148px;
            width :148px;
          .add
            font-size :40px;
            color :rgba(0,0,0,0.5)
            height :150px;
            line-height :150px;

    .btn
      width: 800px;
      text-align: right;
      padding: 0;
      margin-top: 10px;
      .submitBtn
        width: 150px;
        font-size: 15px;

</style>
