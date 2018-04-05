<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">

  <div class="notebook" v-if="flag">

    <div class="top">
      <span class="text">笔记本</span>
      <span class="fa fa-plus plus" title="创建笔记本" @click="newNoteBook"></span>
    </div>

    <div class="search-box">
      <input type="text" class="" name="search-text" placeholder="查找笔记本" v-model="searchText"/>
    </div>

    <div class="notebook-list" v-if="noteBookList.length !== 0">
      <ul>
        <li class="notebook-detail" v-bind="noteBookList" v-for="(item,index) in noteBookList"
        >
          <div class="detail-left" @click="openNoteBook(item.cn_notebook_id,item.cn_notebook_name)">
            <span>{{item.cn_notebook_name}}</span>
            <span>{{item.noteCount}}条记录</span>
          </div>
          <div class="detail-right">
            <span class="fa fa-pencil-square-o" title="重命名"
                  @click="resetNoteBookName(item.cn_notebook_id,item.cn_notebook_name)"></span>

            <span class="fa fa-star-o" title="收藏" v-if="item.cn_notebook_type_id !=2"
                  @click="Store(item.cn_notebook_id,2)"></span>
            <span v-else class="fa fa-star" title="取消收藏" @click="Store(item.cn_notebook_id,1)"></span>
            <span class="fa fa-trash-o" title="删除" @click="deleteNoteBook(item.cn_notebook_id)"></span>
          </div>
        </li>

      </ul>
    </div>

    <div class="notebook-logo" v-else>
      <span class="fa fa-book logo"></span>
      <span>还没有笔记本？</span>
      <span>赶快<i>点击<i class="fa fa-plus"></i>号</i>添加吧</span>
    </div>

  </div>

  <div class="second" v-else>

    <div class="second-top">

       <span class="fa fa-hand-o-left return" @click="closeNoteBook">
          返回笔记本
       </span>

      <div class="second-bookname">
          <span class="fa fa-book fabook">
          </span>
        <span class="fatext">{{second.title}}</span>
      </div>

      <div class="second-selectbar">
        <span>{{noteListInBook.length}}条记录</span>
        <div class="select">
          <el-dropdown trigger="click"  @command="handleCommand">
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

    </div>

    <div class="second-noteList" v-if="noteListInBook.length !== 0">
      <ul>
        <li v-for="item in noteListInBook" v-if="item.cn_note_type_id !== 4">
          <div class="note-detail-left" @click="skim(item)">
            <span class="note-title">{{item.cn_note_title}}</span>
            <span class="note-creatTime">{{item.cn_note_createTime | formatDate}}</span>
            <span class="note-content">
              {{item.cn_note_content}}
            </span>
          </div>
          <div class="note-detail-right">
            <span class="fa fa-share-alt" title="分享笔记" @click="shareNote(item.cn_note_id)"
                  v-clipboard:copy="message"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"></span>

            <span class="fa fa-star-o" title="收藏" v-if="item.cn_note_type_id !=2"
                  @click="StoreNote(item.cn_note_id,2)"></span>
            <span class="fa fa-star" title="取消收藏" v-else @click="StoreNote(item.cn_note_id,1)"></span>
            <span class="fa fa-trash-o" title="删除" @click="deleteNote(item.cn_note_id,4)"></span>
          </div>
        </li>
      </ul>
    </div>

    <div class="second-logo" v-else>
      <span class="fa fa-file-text-o logo"></span>
      <span>还没有笔记？</span>
      <span>赶快<i>点击左侧<i class="fa fa-plus"></i>号</i>添加吧</span>
    </div>

  </div>

</template>

<script>
  import api from '../../../api';
  import store from '../../../store';
  import baseService from '../../../Service/baseService';
  import notebookService from '../../../Service/noetbookService';
  import noteService from '../../../Service/noteService';

  export default {

    data() {
      return {
        name: "notebook",
        noteBookType: '',
        searchText: '',
        flag: true,
        second: {
          title: '',
          noteList: []
        },
        message: '',
        index:''
      };
    },

    computed: {

      noteBookList() {
        return store.state.main.noteBookList;
      },

      noteListInBook(){
          return store.state.noteListInBook;
      },

    },

    watch: {
      searchText: function (value) {
        if (!value) {
          api.post('notebook/noteBookList.do', {
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            if (res.data.status === 0) {
              store.commit("noteBookList", baseService.getNoteBookList());
            }
          });
        } else {
          api.post('notebook/findNoteBook.do', {
            searchText: value,
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            if (res.data.status === 0) {
              store.commit("noteBookList", res.data.data);
            }
          });
        }

      }
    },

    methods: {

      newNoteBook() {
        notebookService.newNoteBook();
      },

      deleteNoteBook(id) {
        notebookService.deleteNoteBook(id);
      },

      resetNoteBookName(id, val) {
        notebookService.resetNoteBookName(id, val);
      },

      Store(id, type) {
        notebookService.Store(id, type);
      },

      openNoteBook(bookId,title) {
        this.index = bookId;
        setTimeout(_ => {
          this.flag = false;
          this.second.title = title;
          notebookService.findNoteByNoteBookId(bookId);
        }, 300);
      },

      closeNoteBook() {
        setTimeout(_ => {
          this.flag = true;
          this.index='';
          this.title='';
        }, 300);
      },

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
              text: '复制成功',
              icon: 'success',
              timer: 3000
            });
          });
      },
      onError() {
        swal('复制失败', '请自动复制链接进行分享' + this.message, '');
      },
      shareNote(noteId) {
        this.userId = store.state.user.cn_user_id;
        this.noteId = noteId;
        this.message = window.location.origin + '/note/shareNote/' + this.userId + '/' + noteId;
      },
      deleteNote(noteId, noteTypeId) {
        noteService.deleteNote(noteId, noteTypeId).then((res)=>{
          notebookService.findNoteByNoteBookId(this.index);
        });
      },
      StoreNote(noteId, noteTypeId) {
        noteService.StoreNote(noteId, noteTypeId).then((res)=>{
          notebookService.findNoteByNoteBookId(this.index);
        });
      },
      skim(value) {
        this.$router.push({path: `/home/newNote/${value.cn_note_id}`});
      },

      handleCommand(command) {
        //创建时间（最早优先）
        if (command === 'a') {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cn_note_createTime', 1));
          store.commit("noteListInBook", this.second.list);
          //创建时间（最新优先）
        } else if (command === 'b') {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cn_note_createTime', -1));
          store.commit("noteListInBook", this.second.list);
          //更新时间（最早优先）
        } else if (command === 'c') {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cn_note_updateTime', -1));
          store.commit("noteListInBook", this.second.list);

          //更新时间（最新优先）
        } else {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cn_note_updateTime', 1));
          store.commit("noteListInBook", this.second.list);
        }
      },

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

    mounted() {

      baseService.getNoteBookList();

    },

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
  .notebook
    display: flex
    flex-direction: column
    .top
      width: 400px
      height: 50px
      padding-left: 20px
      margin-top: 40px
      padding-right: 20px
      .text
        font-size: 20px
      .plus
        font-size: 30px
        float: right
        color: #687b7c
        &:hover
          cursor: pointer
    .search-box
      width: 400px
      height: 60px
      text-align: center
      border-bottom: 1px #687b7c solid
      input
        width: 360px
        height: 40px
        border: 1px #687b7c solid
        line-height: 40px
        border-radius: 3px
        font-size: 20px
        padding-left :8px;
        box-shadow: 0 0 8px -2px grey inset
        &::-webkit-input-placeholder
          font-size: 15px;
          color: #687b7c;
          text-align: center
        &:-moz-placeholder
          font-size: 15px;
          color: #687b7c;
          text-align: center
        &::-moz-placeholder
          font-size: 15px;
          color: #687b7c;
          text-align: center
        &:-ms-placeholder
          font-size: 15px;
          color: #687b7c;
          text-align: center
    .notebook-list
      overflow-y: scroll
      overflow-x: hidden
      flex: 1
      ul
        li
          height: 60px;
          width: 400px;
          margin: 0 auto
          list-style: none
          transition: all .5s
          padding-left: 20px
          padding-right: 10px
          &:hover
            background-color: rgba(43, 181, 92, .9);
            color: white
            cursor: pointer
          &.notebook-detail
            border-bottom: 1px solid #95a5a6
            .detail-left
              width: 250px
              float: left
              span
                display: block
                font-size: 15px
                height: 25px
                line-height: 28px
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis
                text-align: left
                font-family: "Segoe Script", times, serif
            .detail-right
              float: right
              height: 60px;
              line-height: 60px
              opacity: 0
            &:hover .detail-right
              opacity: 1
              transition: all .1s
              color: white
              span
                margin-right: 5px

    .notebook-logo
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

  .second
    display: flex
    flex-direction: column
    .second-top
      width: 400px;
      height: 200px;
      border-bottom: 3px solid #dce4ec;
      .return
        width: 400px;
        height: 50px;
        line-height: 50px;
        display: block;
        padding-left: 10px;
        padding-right: 10px;
        background-color: #595959;
        color: white;
        &:hover
          cursor: pointer;
      .second-bookname
        display: block;
        width: 400px;
        height: 100px;
        margin: 0 auto;
        text-align: center;
        padding-top: 15px;
        background-color: #595959;
        color: white;
        .fabook
          display: block;
          font-size: 25px;
        .fatext
          display: block;
          font-size: 15px;
      .second-selectbar
        display: block;
        width: 400px;
        height: 50px;
        margin: 0 auto;
        padding-left: 20px;
        padding-right: 20px;
        line-height: 50px;
        span
          display: inline-block;
        .select
          display: inline-block
          float: right;

    .second-noteList
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
            padding-top: 20px;
            opacity: 0;
            text-align: center;
          &:hover .note-detail-right
            opacity: 1
            transition: all .5s
            color: white
            span
              display: block;
              height: 20px;
              font-size: 15px;

    .second-logo
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
