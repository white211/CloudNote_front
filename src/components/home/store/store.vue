<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">

  <div class="store" v-if="flag">

    <div class="top">
      <span>收藏列表</span>
    </div>

    <div class="list" v-if="noteStoreList.length !== 0 || noteBookStoreList.length !== 0">

      <div class="noteList">
        <ul>
          <li v-for="item in noteStoreList" @click="skim(item)">
            <div class="note-left">
              <span class="fa fa-file-text-o"></span>
              <span class="note-title">{{item.cn_note_title}}</span>
            </div>
            <div class="note-right">
              <span class="fa fa-minus-circle" title="取消快捷方式" @click="Cancel(item.cn_note_id,1)"></span>
            </div>
          </li>
        </ul>
      </div>

      <div class="noteBookList">
        <ul>
          <li v-for="item in noteBookStoreList">
            <div class="book-left" @click="openNoteBook(item.cn_notebook_id,item.cn_notebook_name)">
              <span class="fa fa-book sign"></span>
              <span class="book-title">{{item.cn_notebook_name}}</span>
            </div>
            <div class="book-right">
              <span class="fa fa-minus-circle" title="取消快捷方式" @click="Cancel(item.cn_notebook_id,2)"></span>
            </div>
          </li>
        </ul>
      </div>

    </div>

    <div class="store-logo" v-else>
      <span class="fa fa-star logo"></span>
      <span>工作更高效</span>
      <span>移动鼠标至某列表中的某个笔记或笔记本，并点击<i class="fa fa-star"></i>创建快捷方式</span>
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

    </div>

    <div class="second-noteList" v-if="noteListInBook.length !== 0">
      <ul>
        <li v-for="item in noteListInBook" v-if="item.cn_note_type_id !== 4">
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

            <span class="fa fa-unlock-alt" title="解密" v-if="item.cnNoteIsEncrypt == 0"
                  @click="encrypt(item,1)"></span>
            <span class="fa fa-lock" title="加密" v-else @click="encrypt(item,0)"></span>

            <span class="fa fa-trash-o" title="删除" @click="deleteNote(item,4)"></span>
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
  import store from '../../../store';
  import baseService from '../../../Service/baseService';
  import storeService from '../../../Service/storeService';
  import noteService from '../../../Service/noteService';
  import notebookService from '../../../Service/noetbookService';

  export default {
    data() {
      return {
        name: "store",
        flag: true,
        second: {
          title: '',
          noteList: []
        },
        message: '',
        index: ''
      };
    },

    methods: {
      /**
       * 取消收藏触发事件
       * @param id
       * @param type
       * @constructor
       */
      Cancel(id, type) {

        storeService.Cancel(id, type);

      },

      /**
       * 查看笔记触发事件
       * @param value
       */
      skim(value) {
        noteService.skim(value).then((res) => {
          if (res) {
            this.$router.push({path: `/home/newNote/${value.cn_note_id}`});
          }
        });
      },

      /**
       * 打开笔记本
       * @param bookId
       * @param title
       */
      openNoteBook(bookId, title) {
        this.index = bookId;
        setTimeout(_ => {
          this.flag = false;
          this.second.title = title;
          notebookService.findNoteByNoteBookId(bookId);
        }, 300);
      },

      /**
       * 关闭笔记本
       */
      closeNoteBook() {
        setTimeout(_ => {
          this.flag = true;
          this.index = '';
          this.title = '';
        }, 300);
      },


      /**
       * 笔记的增删改查
       */
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
      shareNote(item, sharetype) {
        this.userId = store.state.user.cn_user_id;
        this.noteId = item.cn_note_id;
        this.message = window.location.origin + '/note/shareNote/' + this.userId + '/' + item.cn_note_id;
        if (sharetype == 1) {
          noteService.shareNote(item, sharetype).then((res) => {
            swal({
              title: '',
              text: '已取消',
              icon: 'success',
              timer: 2000,
            });
          });
        } else {
          noteService.shareNote(item, sharetype);
        }
      },
      deleteNote(noteId, noteTypeId) {
        noteService.deleteNote(noteId, noteTypeId).then((res) => {
          notebookService.findNoteByNoteBookId(this.index);
          this.$router.replace({path: `/home/newNote`});
        });
      },
      StoreNote(item, noteTypeId) {
        noteService.StoreNote(item, noteTypeId).then((res) => {
          notebookService.findNoteByNoteBookId(this.index);
        });
      },
      skim(value) {
        noteService.skim(value).then((res) => {
          if (res) {
            this.$router.push({path: `/home/newNote/${value.cn_note_id}`});
          }
        });
      },
      encrypt(item, encrypyType) {
        noteService.encrypt(item, encrypyType).then((res) => {
          notebookService.findNoteByNoteBookId(this.index);
        });
      },

      /**
       * 选中框选中触发的事件
       * @param command
       */
      handleCommand(command) {
        //创建时间（最早优先）
        if (command === 'a') {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cnNoteCreateTime', 1));
          store.commit("noteListInBook", this.second.list);
          //创建时间（最新优先）
        } else if (command === 'b') {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cnNoteCreateTime', -1));
          store.commit("noteListInBook", this.second.list);
          //更新时间（最早优先）
        } else if (command === 'c') {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cnNoteUpdateTime', -1));
          store.commit("noteListInBook", this.second.list);
          //更新时间（最新优先）
        } else {
          this.second.list = store.state.noteListInBook;
          this.second.list.sort(this.compare('cnNoteUpdateTime', 1));
          store.commit("noteListInBook", this.second.list);
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

    mounted() {

      baseService.findNoteInStore();

      baseService.findNoteBookInStore();

    },

    computed: {

      noteStoreList() {
        return store.state.storeList.noteStoreList;
      },

      noteBookStoreList() {
        return store.state.storeList.noteBookStoreList;
      },

      noteListInBook() {
        return store.state.noteListInBook;
      },

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
  .store
    display: flex;
    flex-direction: column
    .top
      margin-top: 20px;
      height: 80px;
      width: 400px;
      border-bottom: 3px solid #dce4ec;
      span
        font-size: 20px;
        width: 400px;
        padding-left: 30px;
        line-height: 50px;
        height: 50px;
    .list
      overflow-y: scroll
      overflow-x: hidden
      flex: 1
      margin-top: 10px;
      .noteBookList
        ul
          li
            width: 400px;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            padding-right: 20px;
            font-size: 15px;
            transition: all .5s
            .book-left
              height :30px;
              line-height :30px;
              float: left;
              display: inline-block;
              width :300px;
              .sign
                height :30px;
                line-height :30px;
                float :left;
              .book-title
                margin-left :10px;
                width:250px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space :nowrap;
            .book-right
              float: right;
              display: inline-block;
              opacity: 0;
              transition: opacity .5s;
            &:hover
              background-color: #2dbe60;
              color: white;
              cursor: pointer;
              .book-right
                opacity: 1;
      .noteList
        ul
          li
            width: 400px;
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            padding-right: 20px;
            transition: all .5s
            .note-left
              float: left;
              display: inline-block;
              .note-title
                overflow: hidden;
            .note-right
              float: right;
              display: inline-block;
              opacity: 0;
              transition: opacity .5s;
            &:hover
              background-color: #2dbe60;
              color: white;
              cursor: pointer;
              .note-right
                opacity: 1;

    .store-logo
      text-align: center;
      margin-top: 50%
      .logo
        font-size: 50px;
        color: #2dbe60
      span
        width: 400px;
        height: 20px;
        line-height: 20px;
        display: inline-block


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
            padding-top: 10px;
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
