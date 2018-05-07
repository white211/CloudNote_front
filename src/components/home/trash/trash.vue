<template>

  <div class="trash">

    <div class="top">

      <span class="title">废纸篓</span>

      <span class="clearTrash fa fa-trash-o" title="清空回收站" @click="clearTrash()"></span>

    </div>

    <div class="list" v-if="noteTrashList.length !== 0 || noteBookTrashList.length !== 0">
      <div class="noteList">
        <ul>
          <li v-for="item in noteTrashList">
            <div class="note-left">
              <span class="fa fa-file-text-o sign"></span>
              <span class="note-title">{{item.cn_note_title}}</span>
            </div>
            <div class="note-right">
              <span class="fa fa-refresh" title="还原文件" @click="refresh(item,1)"></span>
              <span class="fa fa-times-circle-o" title="彻底删除" @click="deleteExatly(item.cn_note_id,1)"></span>
            </div>
          </li>
        </ul>
      </div>
      <div class="noteBookList">
        <ul>
          <li v-for="item in noteBookTrashList">
            <div class="book-left">
              <span class="fa fa-book sign"></span>
              <span class="book-title">{{item.cn_notebook_name}}</span>
            </div>
            <div class="book-right">
              <span class="fa fa-refresh" title="还原文件" @click="refresh(item,2)"></span>
              <span class="fa fa-times-circle-o" title="彻底删除" @click="deleteExatly(item.cn_notebook_id,2)"></span>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <div class="store-logo" v-else>
      <span class="fa fa-trash-o logo"></span>
      <span>把不用的文件暂时放于此</span>
    </div>

  </div>

</template>

<script>

  import store from "../../../store";
  import baseService from '../../../Service/baseService';
  import trashService from '../../../Service/trashService';

  export default {
    data() {
      return {
        name: "trash",
      };
    },

    methods: {

      refresh(item, type) {
        trashService.refresh(item, type);
      },

      deleteExatly(id, type) {
        trashService.deleteExatly(id, type);
      },

      clearTrash(){
          trashService.clearTrash();
      }

    },

    mounted() {
      baseService.findNoteInTrash();
      baseService.findNoteBookInTrash();
    },

    computed: {
      noteBookTrashList() {
        return store.state.trashList.noteBookTrashList;
      },
      noteTrashList() {
        return store.state.trashList.noteTrashList;
      },
    }

  };

</script>

<style scoped lang="stylus">
  .trash
    display: flex;
    flex-direction: column
    .top
      margin-top: 20px;
      height: 80px;
      width: 400px;
      border-bottom: 3px solid #dce4ec;
      padding-left :30px;
      padding-right :30px;
      .title
        font-size: 20px;
        line-height: 50px;
        height: 50px;
      .clearTrash
        float :right;
        font-size :30px;
        height :50px;
        line-height :50px;
      &:hover
        cursor :pointer;
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
              float: left;
              display: inline-block
              .sign
                float :left;
                line-height :30px;
                height :30px;
              .book-title
                width :260px;
                height :30px;
                float :left;
                margin-left :5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space :nowrap;
            .book-right
              float: right;
              display: inline-block;
              opacity: 0;
              transition: opacity .5s;
              span
                margin-right: 10px;
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
              .sign
                float :left;
                line-height :30px;
                height :30px;
              .note-title
                width :260px;
                height :30px;
                float :left;
                margin-left :5px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space :nowrap;
            .note-right
              float: right;
              display: inline-block;
              opacity: 0;
              transition: opacity .5s;
              span
                margin-right: 10px;
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

</style>
