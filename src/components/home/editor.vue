<template>
  <div id="editor">
    <div id="bar">
      <div class="com">
        <span class="fa fa-book"></span>
        <el-select v-model="noteBookId" placeholder="笔记本"
                   size="mini" class="select" filterable
        >
          <el-option
            v-for="item in noteBookList"
            :key="item.cn_notebook_id"
            :label="item.cn_notebook_name"
            :value="item.cn_notebook_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="com">
        <span class="fa fa-tags"></span>
        <el-select v-model="noteLabelId" placeholder="标签"
                   size="mini" class="select"  filterable>
          <el-option
            v-for="item in labelList"
            :key="item.cn_label_id"
            :label="item.cn_label_name"
            :value="item.cn_label_id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="com">
        <input type="text" placeholder="写下笔记标题" class="title" v-model="noteTitle"/>
      </div>
      <div class="com" style="float:right;">
        <el-button type="success" plain @click="newNote" class="saveBtn">保存</el-button>
      </div>
    </div>
    <mavon-editor style="height: 100%" v-model="noteContent" ref=md @imgAdd="imgAdd"></mavon-editor>
  </div>
</template>

<script>
  import api from '../../api';
  import store from '../../store';
  import swal from 'sweetalert';
  import axios from 'axios';
  import baseService from '../../Service/baseService';


  export default {

    data() {
      return {
        name: "editor",
        noteLabelId: '',
        noteBookId: '',
        noteTitle: '',
        noteDesc: '',
        noteContent: '',
        noteId: '',
        data: '',
        jjid: ''
      };
    },

    methods: {

      newNote() {
        api.post('/note/newNote.do', {
          noteBookId: this.noteBookId,
          noteContent: this.noteContent,
          noteTitle: this.noteTitle,
          noteDesc: this.noteDesc,
          noteLabel: this.noteLabelId,
          userId: store.state.user.cn_user_id,
          noteId: this.noteId
        }).then((res) => {
          if (res.data.status === 0) {
            swal('已保存', '', 'success').then(value => {
              baseService.getNoteBookList();
              baseService.getNoteList();
              baseService.getTagList();
              this.resetData();
              this.$router.replace({path: `/home/newNote`});
            });
          } else {
            swal(res.data.msg);
          }
        });
      },

      imgAdd(pos, $file) {
        // 第一步.将图片上传到服务器.
        var formdata = new FormData();
        formdata.append('image', $file);
        console.log($file);
        axios({
          url: 'http://127.0.0.1:8080/note/uploadFile.do',
          method: 'post',
          data: formdata,
          headers: {'Content-Type': 'multipart/form-data'},
        }).then((res) => {
          var url = res.data.data;
          this.$refs.md.$img2Url(pos, url);
        });
      },

      resetData() {
        this.noteLabelId = '';
        this.noteBookId = '';
        this.noteTitle = '';
        this.noteDesc = '';
        this.noteContent = '';
        this.noteId = '';
      }

    },

    mounted() {

      if (this.activeNoteId) {
        api.post('/note/findNoteById.do', {
          noteId: this.activeNoteId
        }).then((res) => {
          if (res.data.status === 0) {
            this.noteLabelId = res.data.data.cn_note_label_id || '',
              this.noteBookId = res.data.data.cn_note_book_id || '',
              this.noteTitle = res.data.data.cn_note_title || '',
              this.noteDesc = res.data.data.cn_note_desc || '',
              this.noteContent = res.data.data.cn_note_content || '';
            this.noteId = res.data.data.cn_note_id || '';
          }
        }, (err) => {
          console.log('错误', err);
        });
      }

      baseService.getTagList();
      baseService.getNoteBookList();

    },

    computed: {

      activeNote() {
        if (this.$route.params.id !== null) {
          return this.$route.params.id;
        } else {
          this.resetData();
        }
      },

      activeNoteId() {
        return this.$route.params.id;
      },

      noteBookList() {
        return store.state.main.noteBookList;
      },

      labelList() {
        return store.state.main.tagList;
      }

    },

    watch: {
      activeNote(val) {
        if (val) {
          api.post('/note/findNoteById.do', {
            noteId: val
          }).then((res) => {
            this.noteLabelId = res.data.data.cn_note_label_id || '';
            this.noteBookId = res.data.data.cn_note_book_id || '';
            this.noteTitle = res.data.data.cn_note_title || '';
            this.noteDesc = res.data.data.cn_note_desc || '';
            this.noteContent = res.data.data.cn_note_content || '';
            this.noteId = res.data.data.cn_note_id || '';
          });
        } else {
          this.resetData();
        }

      },

    },

  };
</script>

<style scoped lang="stylus">
  #editor
    margin: auto;
    width: 100%;
    height: 100%;
    #bar
      margin: 0 auto;
      height: 55px;
      margin-bottom: 5px;
      line-height: 55px;
      .com
        float: left
        margin-right: 10px;
        .select
          width: 100px;
        .saveBtn
          width: 100px;
          font-size: 16px;
          text-align: center
        #saveNote
          height: 35px;
          width: 70px;
          border-radius: 5px;
          font-size: 18px;
          padding: 0;
          background-color: rgb(163, 221, 130);
          border: 1px solid #dce4ec;
          &:hover
            background-color: rgb(163, 221, 100);
            cursor: pointer
      .title
        height: 50px;
        line-height: 50px;
        max-width: 600px;
        border: 0;
        outline: none;
        font-size: 25px;
        color: #3FB618;
        padding-left: 5px;
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

  .v-note-wrapper
    z-index: 0

</style>
