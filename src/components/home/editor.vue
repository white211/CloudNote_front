<template>
  <div id="editor">
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
        <input type="button" id="saveNote" class="saveBtn" value="保存" @click="newNote"/>
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
        noteLabelId: 0,
        noteBookId: 0,
        noteTitle: '',
        noteDesc: '',
        noteContent: '',
        noteId: '',
        data: ''
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
              this.$router.go(0);
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
        axios({
          url: 'http://127.0.0.1:8080/note/uploadFile.do',
          method: 'post',
          data: formdata,
          headers: { 'Content-Type': 'multipart/form-data' },
        }).then((res) => {
           var url = res.data.data;
          this.$refs.md.$img2Url(pos, url);
        })
      },

    },

    mounted() {
      if (this.activeNoteId) {
        api.post('/note/findNoteById.do', {
          noteId: this.activeNoteId
        }).then((res) => {
          this.noteLabelId = res.data.data.cn_note_label_id,
            this.noteBookId = res.data.data.cn_note_book_id,
            this.noteTitle = res.data.data.cn_note_title,
            this.noteDesc = res.data.data.cn_note_desc,
            this.noteContent = res.data.data.cn_note_content;
          this.noteId = res.data.data.cn_note_id;
        });
      }

      baseService.getTagList();
      baseService.getNoteBookList();

    },

    computed: {
      activeNote() {
        if (this.$route.params.id != null) {
          return this.$route.params.id;
        }
      },

      activeNoteId() {
        return this.$route.params.id;
      },

      noteBookList(){
        return store.state.main.noteBookList;
      },

      labelList(){
        return store.state.main.tagList;
      }


    },

    watch: {
      activeNote(val) {
        api.post('/note/findNoteById.do', {
          noteId: val
        }).then((res) => {
          this.noteLabelId = res.data.data.cn_note_label_id,
            this.noteBookId = res.data.data.cn_note_book_id,
            this.noteTitle = res.data.data.cn_note_title,
            this.noteDesc = res.data.data.cn_note_desc,
            this.noteContent = res.data.data.cn_note_content;
          this.noteId = res.data.data.cn_note_id;
        });
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
        select
          width: 100px;
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
