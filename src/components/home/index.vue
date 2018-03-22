<template>
  <div class="index">
    <div class="my-container">
      <router-view/>
    </div>
    <div class="sidebar">
      <div class="static-bar">
        <!--logo标志-->
        <router-link to="/">
          <div class="title"><i class="fa fa-pencil"></i></div>
        </router-link>

        <ul class="first-levels">
          <router-link to="/home">
            <li class="item">
              <div class="icon" title="添加笔记">
                <i class="fa fa-plus prt-4"></i>
              </div>
            </li>
          </router-link>
          <li class="item" :class="{ 'active': toggleTab === 'search-box'}">
            <label class="icon" title="搜索笔记" for="search-box">
              <i class="fa fa-search prt-3"></i>
            </label>
          </li>
          <li class="space">
          </li>
          <li class="item" :class="{ 'active': toggleTab === 'store'}">
            <label class="icon" title="收藏" for="store">
              <i class="fa fa-star prt-4"></i>
            </label>
          </li>
          <li class="item" :class="{ 'active': toggleTab === 'note'}">
            <label class="icon" title="笔记" for="note">
              <i class="fa fa-file-text-o prt-4"></i>
            </label>
          </li>
          <li class="item" :class="{ 'active': toggleTab === 'notebook'}">
            <label class="icon" title="笔记本" for="notebook">
              <i class="fa fa-book prt-3"></i>
            </label>
          </li>
          <li class="item" :class="{ 'active': toggleTab === 'tags'}">
            <label class="icon" title="标签" for="tags">
              <i class="fa fa-tags prt-4"></i>
            </label>
          </li>
          <li class="item" :class="{ 'active': toggleTab === 'trash'}">
            <label class="icon" title="废纸篓" for="trash">
              <i class="fa fa-trash-o prt-4"></i>
            </label>
          </li>
        </ul>

        <!--个人头像-->
        <div class="info" title="用户中心">
            <label for="info">
              <img src="@/assets/1.jpg" alt="" class="avatar"/>
            </label>
        </div>
      </div>

      <div class="toggle-bar">
        <input v-model="toggleTab" id="mark" type="radio" name="toggle" checked>
        <label class="mark" for="mark">xxxxxxx</label>
        <div class="block-bar">
          <input v-model="toggleTab" value="search-box" id="search-box" type="radio" name="toggle">
          <div class="detail">
            <input type="text" placeholder="搜索笔记">
          </div>
        </div>
        <div class="block-bar">
          <input v-model="toggleTab" value="store" id="store" type="radio" name="toggle">
          <div class="detail">
            <like/>
          </div>
        </div>
        <div class="block-bar">
          <input v-model="toggleTab" value="note" id="note" type="radio" name="toggle">
          <div class="detail">
            <note/>
          </div>
        </div>
        <div class="block-bar">
          <input v-model="toggleTab" value="notebook" id="notebook" type="radio" name="toggle">
          <div class="detail">
            <notebook/>
          </div>
        </div>
        <div class="block-bar">
          <input v-model="toggleTab" value="tags" id="tags" type="radio" name="toggle">
          <div class="detail">
            <tag/>
          </div>
        </div>
        <div class="block-bar">
          <input v-model="toggleTab" value="trash" id="trash" type="radio" name="toggle">
          <div class="detail">
            <trash/>
          </div>
        </div>
        <div>
          <input type="checkbox" name="info" id="info" v-model="info"/>
          <div class="info-block">
            <div class="info-block-avatar">
              <div id="avatar">
                <img src="@/assets/1.jpg" alt="" title="个人头像"/>
              </div>
              <span>{{email}}</span>
            </div>
            <div class="fuc-list">
              <ul>
                <router-link to="/user/userInfo">
                  <li @click="closeUl"><span class="fa fa-user-o"></span>个人信息</li>
                </router-link>
                <router-link to="/user/updatePass">
                  <li @click="closeUl"><span class="fa fa-eye"></span>修改密码</li>
                </router-link>
                <li @click="logout"><span class="fa fa-sign-out"></span>注销登陆</li>
                <router-link to="/user/msg">
                  <li @click="closeUl"><span class="fa fa-paper-plane-o"></span>使用反馈</li>
                </router-link>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import notebook from './notebook/notebook';
  import note from './note/note';
  import tag from './tags/tag';
  import trash from './trash/trash';
  import like from './store/store';

  import api from '../../api';
  import store from '../../store';
  import swal from 'sweetalert';
  import editor from './editor';

  export default {

    data() {
      return {
        toggleTab: null,
        noteBookList: '',
        labelList: '',
        noteLabelId: 0,
        noteBookId: 0,
        noteTitle: '',
        noteDesc: '',
        noteContent: '',
        noteId: '',
        info: '',
        email: '',
      };
    },
    components: {
      notebook,
      note,
      editor,
      tag,
      like,
      trash,

    },

    methods: {

      logout() {
        store.commit('user', null);
        swal('已经退出登陆', '', 'success').then((res) => {
          this.$router.push({path: '/login'});
        });
      },

      closeUl() {
        this.info = false;
      },

    },

    mounted() {
      if (store.state.user === null) {
        this.$router.push("/login");
      } else {
        this.email = store.state.user.cn_user_email;
      }

      if (this.activeNoteId) {
        api.post('/note/findNoteById.do', {
          noteId: this.activeNoteId
        }).then((res) => {
          this.noteLabelId = res.data.data.cn_note_label_id,
            this.noteBookId = res.data.data.cn_note_book_id,
            this.noteTitle = res.data.data.cn_note_title,
            this.noteDesc = res.data.data.cn_note_desc,
            this.msg = res.data.data.cn_note_content;
          this.noteId = res.data.data.cn_note_id;
        });
      }

    },
  }
  ;
</script>

<style lang="stylus" scoped>
  $black = rgba(0, 0, 0, .05)
  .index
    position: relative
    min-height: 100vh
    .sidebar
      .static-bar
        z-index: 1
        position: absolute
        width: 80px
        height: 100%
        /*max-height: 1800px*/
        top: 0
        left: 0
        box-shadow: 0 0 20px -5px #000000
        background-color: #eeeeee
        .title
          text-align: center
          font-size: 40px
        .first-levels
          z-index: 1
          position: relative
          margin-top: 20px
          .item
            &.active
              .icon
                color: #eeeeee
                background-color: #2dbe60
            .icon
              display: block
              width: 40px
              height: 40px
              margin: 0 auto 20px auto
              border-radius: 50%
              border: 1px solid #2dbe60
              text-align: center
              font-size: 22px
              color: #2dbe60
              cursor: pointer
              transition: all .3s
              &:hover
                color: #eeeeee
                background-color: #2dbe60
              &:checked
                color: #eeeeee
                background-color: #2dbe60
              i
                position: relative
                &.prt-1
                  top: 1px
                &.prt-2
                  top: 2px
                &.prt-3
                  top: 3px
                &.prt-4
                  top: 4px
                &.prt-5
                  top: 5px
          .second-levels
            display: none
            background-color: $black
        .info
          position: absolute
          width: 80px
          height: 80px
          bottom: 0px
          text-align: center
          .avatar
            width: 50px
            height: 50px
            border-radius: 50%
            &:hover
              cursor: pointer

      .toggle-bar
        #mark
          &:checked ~ .mark
            width: 0
            opacity: 0
        .mark
          position: absolute
          display: block
          top: 0
          left: 0
          bottom: 0
          width: 100%
          padding: 0
          margin: 0
          opacity: 1
          transition: width .2s, opacity .1s
          background-color: rgba(0, 0, 0, 0.01)
          cursor: pointer
        .block-bar
          border-right: 10px solid grey;
        .detail
          /*z-index: 100*/
          display: flex
          overflow-y: auto
          overflow-x: hidden
          position: absolute
          left: 80px
          top: 0
          bottom: 0
          width: 400px
          margin-left: -480px
          box-shadow: 0 0 10px -2px gray
          transition: margin-left 0.5s
          background-color: white
        input[type=radio]
          display: none
          &:checked ~ .detail
            margin-left: 0
        input[type=checkbox]
          display: none
          &:checked ~ .info-block
            margin-left: 0

      .info-block
        position: absolute;
        bottom: 10px;
        left: 80px;
        height: 350px;
        background: white;
        width: 350px;
        border-radius: 5px;
        box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.2);
        /*display: flex*/
        overflow-y: auto
        overflow-x: hidden
        margin-left: -480px
        transition: margin-left 0.5s
        padding: 15px 15px 15px 15px;
        .info-block-avatar
          width: 320px;
          height: 130px;
          /*border :1px solid black;*/
          vertical-align: center
          text-align: center
          border-bottom: 1px solid #95a5a6;
          #avatar
            width: 320px;
            margin-top: 30px;
            img
              width: 80px;
              height: 80px;
              border-radius: 50%;
              display: block;
              margin: 0 auto
              border: 5px solid rgba(255, 255, 255, 1);
              &:hover
                border: 3px solid green;
          span
            display: block
            margin-top: 10px

        .fuc-list
          margin-top: 20px
          ul
            li
              list-style: none;
              height: 30px;
              width: 320px;
              line-height: 30px
              padding-left: 10px;
              color: black
              text-decoration: none
              &:hover
                background-color: #55a532
                color: white
                cursor: pointer
                text-decoration: none
              span
                margin-right: 15px;

    .my-container
      position: absolute
      height: 86%
      left: 160px
      right: 80px
      top: 10px
      bottom: 0px
      background-color: white
      #bar
        margin: 0 auto;
        height: 55px;
        margin-bottom: 5px;
        line-height: 55px;
        .com
          float: left
          margin-right: 10px;
          select
            width: 100px;
          #saveNote
            height: 35px;
            width: 70px;
            border-radius: 5px;
            font-size: 20px;
            padding: 0;
        .title
          height: 50px;
          line-height: 50px;
          max-width: 600px;
          border: 0;
          outline: none;
          font-size: 25px;
          color: #3FB618;
          &::-webkit-input-placeholder
            font-size: 15px;
            color: #687b7c;
          &:-moz-placeholder
            font-size: 15px;
            color: #687b7c;
          &::-moz-placeholder
            font-size: 15px;
            color: #687b7c;
          &:-ms-placeholder
            font-size: 15px;
            color: #687b7c;

  /*模态框样式*/
  .swal-title
    margin: 0px;
    font-size: 50px;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.21);
    margin-bottom: 28px;

  .swal-text
    background-color: #FEFAE3;
    padding: 17px;
    border: 1px solid #F0E1A1;
    display: block;
    margin: 22px;
    text-align: center;
    color: #61534e;


</style>
