<template>
  <div class="note">
    <div class="top">
      <span>全部笔记</span>
    </div>
    <div class="selectBar">
      <span class="record">{{noteList.length}}条记录</span>
      <span class="select">选项<span class="fa fa-angle-down"></span></span>
    </div>
    <div class="note-list">
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
            <span class="fa fa-share-alt" title="分享笔记" @click="shareNote(item.cn_note_id,3)"></span>
            <span class="fa fa-star-o" title="收藏" v-if="item.cn_note_type_id !=2"
                  @click="StoreNote(item.cn_note_id,2)"></span>
            <span class="fa fa-star" title="取消收藏" v-else @click="StoreNote(item.cn_note_id,1)"></span>
            <span class="fa fa-trash-o" title="删除" @click="deleteNote(item.cn_note_id,4)"></span>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
  import api from '../../../api';
  import store from '../../../store';
  import swal from 'sweetalert';

  export default {
    data() {
      return {
        name: "note",
        noteList: [],

      };
    },
    mounted() {
      api.post('/note/noteList.do', {
        userId: store.state.user.cn_user_id
      }).then((res) => {
        if (res.data.status === 0) {
          console.log(res);
          this.noteList = res.data.data;
        }
      });
    },
    computed: {},
    watch: {},
    methods: {
      shareNote(noteId) {

      },
      deleteNote(noteId, noteTypeId) {
        swal({
          title: "你确定要删除吗?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              api.post('/note/updateNoteTypeId.do', {
                noteId: noteId,
                noteTypeId: noteTypeId
              }).then((res) => {
                if (res.data.status === 0) {
                  swal("已经被删除，可到回收站找回", {
                    icon: "success",
                    timer: 3000
                  }).then(value => {
                    this.$router.go(0);
                  });
                } else {
                  swal("删除失败", {
                    icon: "error",
                  });
                }
                console.log(res);
              });
            }
          });


      },
      StoreNote(noteId, noteTypeId) {
        api.post('/note/updateNoteTypeId.do', {
          noteId: noteId,
          noteTypeId: noteTypeId
        }).then((res) => {
          if (noteTypeId == 1) {
            if (res.data.status === 0) {
              swal({
                title: '已取消收藏',
                timer: 3000,
                icon: 'success'
              }).then(value => {
                this.$router.go(0);
              });
            } else {
              swal({
                title: '取消收藏失败',
                timer: 3000,
                icon: 'error'
              });
            }
          } else if (noteTypeId == 2) {
            if (res.data.status === 0) {
              swal({
                title: '收藏成功',
                timer: 3000,
                icon: 'success'
              }).then(value => {
                this.$router.go(0);
              });
            } else {
              swal({
                title: '收藏失败',
                timer: 3000,
                icon: 'error'
              });
            }
          }
        });
      },
      skim(value) {
        this.$router.push({path: `/home/note/${value.cn_note_id}`});
      }
    },

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
            /*border :1px solid black*/
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
              /*white-space: nowrap;*/
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


</style>
