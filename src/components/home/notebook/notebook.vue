<template>
  <div class="notebook">
    <div class="top">
      <span class="text">笔记本</span>
      <span class="fa fa-plus plus" title="创建笔记本" @click="newNoteBook"></span>
    </div>
    <div class="search-box">
      <input type="text" class="" name="search-text" placeholder="查找笔记本" v-model="searchText"/>
    </div>
    <div class="notebook-list">
      <ul>
        <li class="notebook-detail" v-bind="noteBookList" v-for="item in noteBookList" v-if="item.cn_notebook_type_id != 4">
          <div class="detail-left">
            <span>{{item.cn_notebook_name}}</span>
            <span>{{item.noteCount}}条记录</span>
          </div>

          <div class="detail-right">
            <span class="fa fa-pencil-square-o" title="重命名" @click="resetNoteBookName(item.cn_notebook_id,item.cn_notebook_name)"></span>

            <span class="fa fa-star-o" title="收藏" v-if="item.cn_notebook_type_id !=2"
                  @click="Store(item.cn_notebook_id,2)"></span>
            <span v-else class="fa fa-star" title="取消收藏" @click="Store(item.cn_notebook_id,1)"></span>
            <span class="fa fa-trash-o" title="删除" @click="deleteNoteBook(item.cn_notebook_id)"></span>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  import api from '../../../api';
  import store from '../../../store';

  export default {
    data() {
      return {
        name: "notebook",
        noteBookList: '',
        noteBookType: '',
        searchText:''
      };
    },
    computed:{

    },
    watch:{
      searchText:function (value) {
        if(!value){
          api.post('notebook/noteBookList.do',{
            userId:store.state.user.cn_user_id,
          }).then((res)=>{
            if (res.data.status === 0) {
              this.noteBookList = res.data.data;
              console.log(res);
            }
          });
        }else{
          api.post('notebook/findNoteBook.do',{
            searchText: value,
            userId:store.state.user.cn_user_id,
          }).then((res)=>{
            if (res.data.status === 0) {
              this.noteBookList = res.data.data;
              console.log(res);
            }
          });
        }

      }
    },

    methods: {
      newNoteBook() {
        swal({
          title: "新建笔记本",
          text: "",
          buttons: true,
          dangerMode: true,
          content: {
            element: 'input',
            attributes: {
              placeholder: "给笔记本起个名字，如：springboot",
              type: 'text',
            },
          },
        })
          .then((val) => {
            if (val) {
              api.post('/notebook/newNoteBook.do', {
                userId: store.state.user.cn_user_id,
                noteBookName: val,
              }).then((res) => {
                if (res.data.status === 0) {
                  swal({
                    title: '创建成功',
                    icon: 'success',
                    timer: 3000,
                  }).then(value => {
                    this.$router.go(0);
                  });
                } else {
                  swal('创建失败', res.data.msg, 'error');
                }
                console.log(res);
              });
            }
          });
      },
      deleteNoteBook(id) {
        swal({
          title: "你确定要删除吗?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
              api.post('/notebook/deleteNoteBook.do', {
                userId: store.state.user.cn_user_id,
                noteBookId: id,
              }).then((res) => {
                if (res.data.status === 0) {
                  swal("已经被删除，可到回收站找回", {
                    icon: "success",
                    timer:3000
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
      resetNoteBookName(id,val) {
        swal({
          title: '重命名笔记本',
          text: '',
          content: {
            element: 'input',
            attributes: {
              // placeholder: "给笔记本起个名字，如：springboot",
              type: 'text',
              value:val
            },
          },
          buttons: {
            confirm: {
              text: '确定',
              closeModal: true,
              value: true,
              visible: true,
              className: "",
            },
          }
        })
          .then((val) => {
            if (!val) {
              return false;
            }
            api.post('/notebook/resetName.do', {
              newName: val,
              noteBookId: id,
              userId: store.state.user.cn_user_id,
            }).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                swal('重命名成功', '', 'success').then(value => {
                  this.$router.go(0);
                });
                this.mounted();
                this.$router.replace({path: '/home'});
              } else {
                swal('重命名失败', res.data.msg, 'error');
              }
            });
          });
      },
      Store(id, type) {
        api.post('notebook/setNoteBookType.do', {
          userId: store.state.user.cn_user_id,
          noteBookId: id,
          noteBookType: type
        }).then((res) => {
          if (type == 1) {
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
          } else if (type == 2) {
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
    },
    mounted() {
      api.post('/notebook/noteBookList.do', {
        userId: store.state.user.cn_user_id
      }).then((res) => {
        console.log(res);
        this.noteBookList = res.data.data;
      });
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
        overflow-y: scroll
        overflow-x: hidden
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


</style>
