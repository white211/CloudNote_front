<template>
  <div v-if="isloaded">
    <template v-if="success">
      <div class="shareNote">
        <div class="nav">
          <span class="fa fa-pencil logo"></span>
          <router-link to="/">
        <span class="home">
           首页
        </span>
          </router-link>
          <div class="nav-right">
            <div v-if="showUser !== null">
              欢迎！！！{{showUser}}
            </div>
            <div v-else>
              <router-link to="/login">
                <span class="login-span">登录</span>
              </router-link>
              <router-link to="/register">
                <span class="register-span">注册</span>
              </router-link>
            </div>
          </div>
        </div>

        <div class="content">
          <div class="noteTitle">
            <span>
              {{noteTitle}}
            </span>
          </div>
          <div class="userInfo">
            <div class="avatar">
              <img v-bind:src="avatar" alt="" v-if="avatar"/>
              <img src="@/assets/default.png" alt="" v-else/>
            </div>
            <div class="userinfo-right">
                <span class="nickName" v-if="nickName">
                    {{nickName}}
                </span>
              <span class="nickName" v-else>
                    {{email}}
                </span>

              <span class="time">
                   {{noteTime}} 阅读 {{read}} &nbsp;&nbsp;评论 {{commentSize}}  &nbsp;&nbsp;
                </span>
            </div>
          </div>
          <div v-html="mark(noteContent)" class="text">
          </div>
          <span class="text-end">
          文章End...
      </span>
          <div class="comment-block">
            <div class="comment-area">
              <div class="img">
                <img v-bind:src="comAvatar" alt="" v-if="comAvatar"/>
                <img src="@/assets/default.png" alt="" v-else/>
              </div>
              <div class="input">
                <textarea v-model="commentContent" name="comment" id="comment" placeholder="你的评论..." class="area"/>
              </div>

              <div class="btn_com">
                <input type="button" class="com_btn" value="评论" @click="newComment"/>
              </div>
            </div>
            <div class="comment-list">
              <span class="number">{{commentSize}}条评论</span>
              <ul v-if="commentList !== null">
                <li v-for="(item,index) in commentList">
                  <div class="lu-avatar">
                    <img v-bind:src="item.cn_user_avatar" alt="" v-if="item.cn_user_avatar"/>
                    <img src="@/assets/default.png" alt="" v-else/>
                  </div>
                  <div class="lu-info">
                    <span>{{item.cn_user_email}}</span>
                    <span>{{commentList.length - index}}楼 {{item.cn_comment_creatTime}}</span>
                  </div>
                  <div class="comment-content">
                    {{item.cn_comment_content}}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </template>
    <template v-else>
      <div class="icon" style="color: #F76260"><span class="glyphicon glyphicon-remove-sign"></span></div>
      <h4 style="text-align: center">
        文章不存在或已经被作者删除！
      </h4>
    </template>
  </div>
</template>

<script>
  import marked from 'marked';
  import api from '../../../api';
  import store from '../../../store';

  export default {
    data() {
      return {
        name: "shareNote",
        noteContent: '',
        noteTitle: '',
        noteTime: '',
        email: '',
        read: '',
        nickName: null,
        avatar: '',
        showUser: null,
        success: false,
        isloaded: false,
        commentList: [],
        commentSize: 0,
        commentContent: null,
        comAvatar: ''
      };
    },

    mounted() {

      //判断有没有用户已经登陆
      if (store.state.user !== null) {
        this.showUser = store.state.user.cn_user_email;
        this.comAvatar = store.state.user.cn_user_avatar;
      }
      //获取分享笔记的内容
      api.post('/note/findNoteById.do', {noteId: this.$route.params.id})
        .then((res) => {
          if (res.data.status === 0 && res.data.data !== null) {
            this.success = true;
            console.log(res);
            this.noteContent = res.data.data.cn_note_content;
            this.noteTitle = res.data.data.cn_note_title;
            this.noteTime = res.data.data.cn_note_creatTime;
            this.read = res.data.data.cn_note_read + 1;
          } else {
            this.success = false;
          }
          this.isloaded = true;
        });
      //获取作者的内容
      api.post('/user/findUserById.do', {userId: this.$route.params.userId})
        .then((res) => {
          if (res.data.status === 0) {
            console.log(res);
            this.nickName = res.data.data.cn_user_nickname;
            this.email = res.data.data.cn_user_email;
            this.avatar = res.data.data.cn_user_avatar;
          }
        });
      //添加笔记的阅读量
      api.post('/note/addRead.do', {
        noteId: this.$route.params.id
      }).then((res) => {
        if (!res.data.status) {
          console.log(res);
        }
      });
      //获取当前笔记的评论列表
      api.post('/comment/CommentListByNoteId.do', {
        noteId: this.$route.params.id
      }).then((res) => {
        if (!res.data.status) {
          this.commentList = res.data.data;
          this.commentSize = res.data.data.length;
        } else {
          this.commentList = null;
          this.commentSize = 0;
        }
      });

    },

    methods: {

      mark(md) {
        return marked(md);
      },

      newComment() {
        if (store.state.user === null) {
          swal('登陆之后才能评论', '', 'error');
        }
        api.post('/comment/newComment.do', {
          userId: store.state.user.cn_user_id,
          noteId: this.$route.params.id,
          commentContent: this.commentContent
        }).then((res) => {
          if (res.data.status === 0) {
            console.log(res);
            swal('评论成功', '', 'success').then((res) => {
              api.post('/comment/CommentListByNoteId.do', {
                noteId: this.$route.params.id
              }).then((res) => {
                if (!res.data.status) {
                  this.commentList = res.data.data;
                  this.commentSize = res.data.data.length;
                  this.commentContent = '';
                } else {
                  console.log(res);
                  this.commentList = null;
                  this.commentSize = 0;
                }
              });
            });
          } else {
            swal('', res.data.msg, 'error');
          }
        });
      }

    }

  };
</script>

<style lang="stylus">
  .shareNote
    .nav
      height: 60px;
      width: 100%;
      max-width: 1800px;
      line-height: 60px;
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin-left: auto;
      margin-right: auto;
      border-bottom: 1px #e7e7e7 solid;
      z-index: 100;
      background-color: white
      .logo
        color: #2dbe60;
        font-size: 50px;
        height: 60px;
        line-height: 60px;
        margin-left: 10%;
        float: left
      .home
        float: left
        width: 66px;
        height: 60px;
        line-height: 60px;
        margin-left: 8%;
        padding: 0
        text-align: center
        font-size: 20px;
        &:hover
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.03);
      .nav-right
        float: right;
        margin-right: 10%;
        .login-span
          color: rgba(0, 0, 0, 0.4);
          margin-right: 30px;
          font-size: 18px;
          &:hover
            cursor: pointer;
        .register-span
          display: inline-block
          text-align: center;
          border: 1px solid #2dbe60;
          border-radius: 15px;
          width: 100px;
          height: 40px;
          line-height: 40px;
          &:hover
            background-color: rgba(47, 255, 152, 0.1);
    .content
      margin: 0 auto;
      width: 700px;
      margin-top: 100px;
      .noteTitle
        width: 700px;
        span
          font-size: 25px;
          font-weight: 550;
      .userInfo
        height: 120px;
        width: 700px;
        padding: 20px 0 20px 0;
        .avatar
          float: left;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: 1px solid #dce4ec;
          img
            width: 60px;
            height: 60px;
            border-radius: 50%;
        .userinfo-right
          float: left;
          margin-left: 20px;
          display: inline-block;
          height: 100px;
          padding-top: 10px;
          span
            display: block;
            &.nickName
              font-size: 18px;
      .text
        background-color: rgba(0, 0, 0, 0.03)
        padding-top: 20px;
        padding-bottom: 20px;
        clear: both;
        min-height: 350px;
        padding-left: 20px;
        padding-right: 20px;
        ol
          padding-left: 30px
        ul
          padding-left: 30px;
      .text-end
        display: block;
        width: 700px;
        height: 40px;
        background-color: rgba(46, 255, 100, 0.1);
        margin-top: 20px;
        font-size: 15px;
        text-align: center;
        line-height: 40px;
        margin-bottom: 20px;
        border-radius: 2px;
      .comment-block
        width: 700px;
        height: 500px;
        padding-top: 50px;
        .comment-area
          width: 700px;
          height: 130px;
          .img
            display: inline-block;
            float: left;
            text-align: center
            line-height: 50px;
            height: 50px;
            width: 50px;
            /*border :1px solid #95a5a6;*/
            border-radius: 50%;
            margin-right: 30px;
            img
              width: 50px;
              height: 50px;
              border-radius: 50%;
              line-height: 50px;
          .input
            float: left;
            display: inline-block
            height: 80px;
            width: 615px;
            .area
              height: 80px;
              width: 615px;
              border: 1px solid black;
              border-radius: 5px;
              font-size: 18px;
              resize: none
              padding-left: 10px;
              padding-right: 10px;
          .btn_com
            width: 700px;
            .com_btn
              float: right;
              border-radius: 5px;
              width: 80px;
              height: 30px;
              background-color: rgb(163, 221, 130)
              font-size: 15px;
              letter-spacing: 10px;
              text-align: center;
              margin-right: 5px;
              margin-top: 10px;
              &:hover
                cursor: pointer;
                background-color: rgb(152, 217, 100);
                color: white

        .comment-list
          .number
            width: 700px;
            height: 30px;
            font-weight: 600;
            float: left;
            display: block;
            border-bottom: 1px #e7e7e7 solid;
          ul
            display: block;
            padding-top: 30px;
            li
              list-style: none;
              min-height: 100px;
              border-bottom: 1px #e7e7e7 solid;
              width: 700px;
              display: block
              padding-top: 20px;
              .lu-avatar
                display: inline-block;
                float: left;
                line-height: 40px;
                height: 40px;
                margin-right: 20px;
                width: 40px;
                /*border :1px solid #95a5a6;*/
                border-radius: 50%;
                img
                  height: 40px;
                  line-height: 40px;
                  width: 40px;
                  border-radius: 50%;
              .lu-info
                float: left;
                display: inline-block;
                height: 60px;
                width: 600px;
                span
                  display: block;
                  height: 25px;
                  line-height: 25px;
              .comment-content
                height: 50px;
                display: inline-block;
                width: 700px;
                margin-top: 10px;

  .icon
    margin: 20px auto;
    width: 200px;
    height: 200px;
    line-height: 200px;
    font-size: 200px;
</style>
