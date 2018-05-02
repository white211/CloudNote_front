<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">

  <div class="note">

    <div class="top">
      <span>全部笔记</span>
    </div>

    <div class="selectBar">
      <span class="record">{{noteList.length}}条记录</span>
      <div class="select">
        <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            选项<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a">创建日期（最早优先）</el-dropdown-item>
            <el-dropdown-item command="b">创建日期（最新优先）</el-dropdown-item>
            <el-dropdown-item command="c">更新日期（最早优先）</el-dropdown-item>
            <el-dropdown-item command="d">更新日期（最新优先）</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div class="note-list" v-if="noteList.length !== 0">
      <ul>
        <li v-for="item in noteList ">
          <div class="note-detail-left" @click="skim(item)">
            <span class="note-title">{{item.cn_note_title}}</span>
            <span class="note-creatTime">{{item.cnNoteCreateTime | formatDate}}</span>
            <span class="note-content" v-if="item.cnNoteIsEncrypt == 1">
              {{item.cn_note_content}}
            </span>
            <span v-else>******</span>
          </div>
          <div class="note-detail-right">

            <span class="fa fa-share-alt" title="分享笔记" v-if="item.cnNoteIsShare == 1" @click="shareNote(item,0)"
                  v-clipboard:copy="message"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"></span>
            <span class="fa fa-minus-circle" title="取消分享" v-else @click="shareNote(item,1)"></span>

            <span class="fa fa-star-o" title="收藏" v-if="item.cn_note_type_id !=2"
                  @click="StoreNote(item,2)"></span>
            <span class="fa fa-star" title="取消收藏" v-else @click="StoreNote(item,1)"></span>

            <span class="fa fa-lock" title="解密" v-if="item.cnNoteIsEncrypt == 0"
                  @click="encrypt(item,1)"></span>
            <span class="fa fa-unlock-alt" title="加密" v-else @click="encrypt(item,0)"></span>

            <span class="fa fa-trash-o" title="删除" @click="deleteNote(item,4)"></span>

          </div>
        </li>
      </ul>
    </div>

    <div class="note-logo" v-else>
      <span class="fa fa-file-text-o logo"></span>
      <span>还没有笔记？</span>
      <span>赶快<i>点击左侧<i class="fa fa-plus"></i>号</i>添加吧</span>
    </div>

  </div>

</template>

<script>
  import store from '../../../store';
  import swal from 'sweetalert';
  import noteService from "../../../Service/noteService";
  import baseService from '../../../Service/baseService';

  export default {

    data() {
      return {
        name: "note",
        message: '',
        userId: '',
        noteId: '',
        list: '',
      };
    },

    mounted() {
      baseService.getNoteList();
    },

    computed: {
      noteList() {
        return store.state.main.noteList;
      }
    },

    watch: {},

    methods: {

      /**
       *笔记的增删改查
       */
      //复制成功调用的方法
      onCopy() {
        swal({
          title: '',
          text: '分享链接:' + this.message,
          closeOnClickOutside: false,
          button: {
            confirm: '',
            text: '复制链接',
            closeModal: true,
          }
        })
          .then((res) => {
            swal({
              title: '',
              text: '已复制到粘贴板',
              icon: 'success',
              timer: 3000
            });
          });
      },
      //复制失败调用的方法
      onError() {
        swal('复制失败', '请自动复制链接进行分享' + this.message, '');
      },
      shareNote(item, sharetype) {
        this.userId = store.state.user.cn_user_id;
        this.noteId = item.cn_note_id;
        this.message = window.location.origin + '/note/shareNote/' + this.userId + '/' + item.cn_note_id;
        if (sharetype == 1) {
          noteService.shareNote(item, sharetype).then((res) => {
              swal({
                title:'',
                text:'已取消',
                icon:'success',
                timer:2000,
              });
          });
        } else {
          noteService.shareNote(item, sharetype);
        }
      },
      deleteNote(item, noteTypeId) {
        noteService.deleteNote(item, noteTypeId).then((res)=>{
          this.$router.replace({path: `/home/newNote`});
        });
      },
      StoreNote(item, noteTypeId) {
        noteService.StoreNote(item, noteTypeId);
      },
      encrypt(item, encrypyType) {
        noteService.encrypt(item, encrypyType);
      },
      skim(value) {
        noteService.skim(value).then((res) => {
          if (res) {
            this.$router.push({path: `/home/newNote/${value.cn_note_id}`});
          }
        });
      },

      /**
       * select选中时触发的事件
       * @param command
       */
      handleCommand(command) {
        //创建时间（最早优先）
        if (command === 'a') {
          this.list = store.state.main.noteList;
          this.list.sort(this.compare('cnNoteCreateTime', 1));
          store.commit("noteList", this.list);
          //创建时间（最新优先）
        } else if (command === 'b') {
          this.list = store.state.main.noteList;
          this.list.sort(this.compare('cnNoteCreateTime', -1));
          store.commit("noteList", this.list);
          //更新时间（最早优先）
        } else if (command === 'c') {
          this.list = store.state.main.noteList;
          this.list.sort(this.compare('cnNoteUpdateTime', 1));
          store.commit("noteList", this.list);
          //更新时间（最新优先）
        } else {
          baseService.getNoteList();
        }
      },

      /**
       * 对笔记进行排序
       * @param pro
       * @param rev
       * @returns {Function}
       */
      compare(pro, rev) {
        if (rev) {
          rev = rev > 0 ? 1 : -1;
        } else {
          rev = 1;
        }
        return function (a, b) {
          let time1 = Math.round((new Date(a[pro]).getTime()) / 1000);
          let time2 = Math.round((new Date(b[pro]).getTime()) / 1000);
          if (time1 - time2 > 0) {
            return rev * 1;
          }
          if (time1 - time2 < 0) {
            return rev * -1;
          }
          return 0;
        };
      }

    },

    /**
     * 过滤器格式化时间
     */
    filters: {
      formatDate(value) {
        if (!value) return '';
        value = value.toString();
        return value.split(" ")[0];
      }
    }


  };

</script>

<style scoped lang="stylus">

  .note
    display: flex
    flex-direction: column
    .top
      margin-top: 20px;
      height: 50px;
      span
        font-size: 20px;
        width: 400px;
        padding-left: 30px;
        line-height: 50px;
        height: 50px;
    .selectBar
      height: 50px;
      line-height: 50px;
      width: 400px;
      padding-left: 30px;
      padding-right: 30px;
      border-bottom: 3px solid #dce4ec;
      .record
        float: left;
      .select
        float: right;
      &:hover
        cursor: pointer

    .note-list
      overflow-y: scroll
      overflow-x: hidden
      flex: 1
      ul
        li
          width: 400px;
          height: 100px;
          border-bottom: 1px solid #687b7c
          padding-right: 20px
          transition: all 0.5s
          &:hover
            background-color: rgba(43, 181, 92, .9);
            color: white
            cursor: pointer
          .note-detail-left
            float: left
            width: 360px;
            height: 100px
            padding-left: 20px
            text-align: left
            padding-top: 5px
            span
              display: block;
            .note-title
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-weight: bold
            .note-creatTime
              font-size: 10px
            .note-content
              font-size: 15px;
              overflow: hidden;
              text-overflow: ellipsis
              height: 50px;
              padding: 5px
          .note-detail-right
            float: right
            height: 100px;
            width: 15px;
            padding-top: 10px;
            opacity: 0
            text-align: center;
          &:hover .note-detail-right
            opacity: 1
            transition: all .5s
            color: white
            span
              display: block;
              height: 20px;
              font-size: 15px;

    .note-logo
      text-align: center;
      margin-top: 50%
      .logo
        font-size: 50px;
        color: #2dbe60
      i
        text-indent: 10px
      span
        width: 400px;
        height: 20px;
        line-height: 20px;
        display: inline-block
        text-indent: 10px;

</style>
