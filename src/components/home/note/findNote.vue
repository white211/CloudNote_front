<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">
  <div class="findNote">
    <div class="top">
      <span>查找笔记</span>
    </div>
    <div class="selectBar">
      <div>
        <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select">
          <el-select v-model="select" slot="prepend" placeholder="笔记本">
            <el-option v-for="item in noteBookList" v-if="item.noteCount !== 0" v-bind:label="item.cn_notebook_name" v-bind:value="item.cn_notebook_id"></el-option>
          </el-select>
        </el-input>
      </div>
    </div>
    <div class="notelist" v-if="noteList.length !== 0">
      <ul>
        <li v-for="item in noteList">
          <div class="note-detail-left" @click="skim(item)">
            <span class="note-title">{{item.cn_note_title}}</span>
            <span class="note-creatTime">{{item.cn_note_creatTime}}</span>
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
    <div class="store-logo" v-else>
      <span class="fa fa-search logo"></span>
      <span>根据笔记内容或标题搜索对应笔记本中的笔记</span>
    </div>
  </div>
</template>

<script>
  import  store from '../../../store';
  import noteService from  '../../../Service/noteService';
  import baseService from '../../../Service/baseService'

  export default {

    data() {
      return {
        name: "findNote",
        searchText: '',
        select:'',
        noteList:[],
        message:''
      };
    },

    methods: {
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
        noteService.deleteNote(noteId,noteTypeId);
      },
      StoreNote(noteId, noteTypeId) {
        noteService.StoreNote(noteId, noteTypeId);
      },
      skim(value) {
        this.$router.push({path: `/home/newNote/${value.cn_note_id}`});
      }
    },

    mounted() {
       baseService.getNoteBookList();
    },

    computed:{
      noteBookList(){
         return store.state.main.noteBookList;
      },
    },

    watch:{
      searchText(value){
        if(this.select && value){
          noteService.SearchText(value,this.select).then((res)=>{
            if(res){
              this.noteList = res;
            }else {
              this.noteList =[];
            }
          });
        }else{
          this.noteList =[];
        }
      },


    }

  };


</script>

<style scoped lang="stylus">
  .findNote
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
      height: 80px;
      line-height: 80px;
      width: 400px;
      padding-right: 10px;
      border-bottom: 3px solid #dce4ec;
      padding-left :10px;
      .el-select
        width: 90px;
      .input-with-select
      .el-input-group__prepend
        width :370px;
    .store-logo
      text-align: center;
      margin-top: 50%
      .logo
        font-size: 80px;
        height :80px;
        color: #2dbe60
      span
        width: 400px;
        height: 20px;
        line-height: 20px;
        display: inline-block
    .notelist
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
            width: 10px;
            padding-top: 20px;
            opacity: 0
          &:hover .note-detail-right
            opacity: 1
            transition: all .5s
            color: white
            span
              display: block;
              height: 20px;
              font-size: 15px;


</style>
