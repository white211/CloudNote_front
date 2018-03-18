<template>
  <div class="index">
    <div class="my-container">
      <div id="bar">
        <div class="com">
          <span class="fa fa-file-text"></span>
          <select class="notebook" v-model="noteBookId">
            <option value="0">笔记本</option>
            <option v-for="item in noteBookList"
                    v-bind:value="item.cn_notebook_id"
                    v-if="item.cn_notebook_type_id !== 4">{{item.cn_notebook_name}}
            </option>
          </select>
        </div>
        <div class="com">
          <span class="fa fa-tags"></span>
          <select class="tags" v-model="noteLabelId">
            <option value="0">标签</option>
            <option v-for="item in labelList" v-bind:value="item.cn_label_id">{{item.cn_label_name}}</option>
          </select>
        </div>
        <div class="com">
          <input type="text" placeholder="写下笔记标题" class="title" v-model="noteTitle"/>
        </div>
        <div class="com" style="float:right;">
          <input type="button" id="saveNote" class="btn btn-default" value="保存" @click="newNote"/>
        </div>
        <!--<div class="com">-->
        <!--<span class="fa fa-list"></span>-->
        <!--</div>-->
      </div>

      <!--编辑器组件，嵌入到任意父组件中-->
      <markdown
        :mdValuesP="msg"
        :fullPageStatusP="false"
        :editStatusP="true"
        :previewStatusP="true"
        :navStatusP="true"
        :icoStatusP="false"
        @childevent="childEventHandler">
      </markdown>
      <!--变量后面的大写P表示是从父组件中传入的参数-->
      <!--:mdValuesP="msg" 表示需要初始化传入编辑器的内容-->
      <!--:fullPageStatusP="false" 加载时是否全屏（true全屏/false跟随父容器）-->
      <!--:editStatusP="false" 加载时是否显示编辑容器（true显示/false不显示）-->
      <!--:previewStatusP="false" 加载时是否显示预览容器（true全屏/false不显示）-->
      <!--:navStatusP="false" 加载时是否显示顶部快速标签栏（true显示/false不显示）-->
      <!--:icoStatusP="false" 加载时是否显示版权标志（true显示/false不显示）,如果取消掉，请勿忘挖井人，谢谢！-->
      <!--@childevent="childEventHandler" 监听组件的$.emit()方法传回父组件的值，便于父容器保存获取-->
      <!--<div>Container.</div>-->
      <!--<div><input type="text">-->
      <!--<button class="btn btn-danger" style="float: right">xx</button>-->
      <!--</div>-->
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
            <input type="text" placeholder="收藏">
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
            <input type="text" placeholder="标签">
          </div>
        </div>
        <div class="block-bar">
          <input v-model="toggleTab" value="trash" id="trash" type="radio" name="toggle">
          <div class="detail">
            <input type="text" placeholder="回收站">
          </div>
        </div>
        <div>
          <input type="checkbox" name="info" id="info"/>
          <div class="info-block">
            <div class="info-block-avatar">
              <div id="avatar">
                <img src="@/assets/1.jpg" alt="" title="个人头像"/>
              </div>
              <span>942364283@qq.com</span>
            </div>
            <div class="fuc-list">
              <ul>
                <li><span class="fa fa-user-o"></span>个人信息</li>
                <li><span class="fa fa-eye"></span>修改密码</li>
                <li @click="logout"><span class="fa fa-sign-out"></span>注销登陆</li>
                <li><span class="fa fa-paper-plane-o"></span>使用反馈</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import markdown from '../markdown';
  import notebook from './notebook/notebook';
  import note from './note/note';
  import api from '../../api';
  import store from '../../store';
  import swal from 'sweetalert';

  export default {
    data() {
      return {
        toggleTab: null,
        mdValue: '',
        msg: '',
        noteBookList: '',
        labelList: '',
        noteLabelId: 0,
        noteBookId: 0,
        noteTitle: '',
        noteDesc: '',
        noteContent: '',
        noteId:''
      };
    },
    components: {
      markdown, // 声明mardown组件
      notebook,
      note
    },

    methods: {
      // 监听事件，接收子组件传过来的数据
      childEventHandler: function (res) {
        // res会传回一个data,包含属性mdValue和htmlValue，具体含义请自行翻译
        this.msg = res;
      },

      logout() {
        store.commit('user', null);
        swal('已经退出登陆', '', 'success').then((res) => {
          this.$router.push({path: '/login'});
        });
      },

      newNote() {
        api.post('/note/newNote.do', {
          noteBookId: this.noteBookId,
          noteContent: this.msg.mdValue,
          noteTitle: this.noteTitle,
          noteDesc: this.noteDesc,
          noteLabel: this.noteLabelId,
          userId: store.state.user.cn_user_id,
          noteId:this.noteId
        }).then((res) => {
          if (res.data.status === 0) {
            swal('新增成功', '', 'success').then(value => {
              this.$router.go(0);
            });
          } else {
            swal(res.data.msg);
          }
        });
      },

    },

    computed: {
      activeNote: function () {
        if (this.$route.params.id != null) {
          return this.$route.params.id;
        }
      },

      activeNoteId(){
        return this.$route.params.id;
      }
    },

    watch: {
      activeNote: function (val) {
        api.post('/note/findNoteById.do', {
          noteId: val
        }).then((res) => {
            this.noteLabelId = res.data.data.cn_note_label_id,
            this.noteBookId = res.data.data.cn_note_book_id,
            this.noteTitle = res.data.data.cn_note_title,
            this.noteDesc = res.data.data.cn_note_desc,
            this.msg = res.data.data.cn_note_content;
            this.noteId = res.data.data.cn_note_id;
        });
      },
      // activeNoteId(val){
      //
      // }

    },

    mounted() {
      if (this.activeNoteId){
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
      api.post('/notebook/noteBookList.do', {
        userId: store.state.user.cn_user_id
      }).then((res) => {
        console.log(res);
        this.noteBookList = res.data.data;
      });

      api.post('/label/labelList.do', {
        userId: store.state.user.cn_user_id
      }).then((res) => {
        console.log(res);
        this.labelList = res.data.data;
      });

    },


  }
  ;
</script>

<style lang="stylus" scoped>
  $black = rgba(0, 0, 0, .05)
  .index
    position: relative
    min-height: 100vh

    //background-color: $black
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
              &:hover
                background-color: #55a532
                color: white
                cursor: pointer
              span
                margin-right: 15px;

    .my-container
      position: absolute
      height: 85%
      left: 160px
      right: 80px
      top: 10px
      bottom: 0px
      /*max-height :1800px*/
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

</style>
