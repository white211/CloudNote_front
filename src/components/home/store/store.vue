<template>
  <div class="store">
    <div class="top">
      <span>收藏列表</span>
    </div>
    <div class="list" v-if="noteStoreList.length !== 0 || noteBookStoreList.length !== 0">
      <div class="noteList">
        <ul>
          <li v-for="item in noteStoreList">
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
            <div class="book-left">
              <span class="fa fa-book"></span>
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
</template>

<script>
  import store from '../../../store'
  import baseService from '../../../Service/baseService'
  import storeService from '../../../Service/storeService';

  export default {
    data() {
      return {
        name: "store",
      };
    },

    methods: {

      Cancel(id, type) {

        storeService.Cancel(id, type);

      },

    },

    mounted() {
       baseService.findNoteInStore();
       baseService.findNoteBookInStore();
    },

    computed:{
      noteStoreList(){
        return store.state.storeList.noteStoreList;
      },
      noteBookStoreList(){
        return store.state.storeList.noteBookStoreList;
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
              float: left;
              display: inline-block
              .book-title
                overflow: hidden
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
</style>
