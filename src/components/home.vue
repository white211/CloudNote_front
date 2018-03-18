<template>

  <div class="container" style="min-width: 660px;max-width: 1800px;height: 100%;margin: 0 auto;width: 100%">
    <div id="nav" style="height: 50px;min-width: 660px;max-width: 1800px;background-color: black;width: 100%">
      <div id="nav-left" style="height: 50px;line-height: 50px;float: left;margin-left: 20%;">
        <router-link to="/"><img src="@/assets/logo.png" alt="" style="height: 50px;line-height: 50px;"/></router-link>
      </div>

      <div id="nav-right" style="float: right;margin-right: 15%;height: 50px;line-height: 50px;">
        <ul class="nav navbar-nav navbar-right"
            style="color: white;height: 50px;line-height: 50px;background-color: black">
          <li class="dropdown">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true"
               aria-expanded="false" style="color: white;height: 50px;">white<span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">个人中心</a></li>
              <li><a href="#">账号设置</a></li>
              <li><a href="#">修改密码</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#" @click="logout">注销登陆</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>

    <!-- Push Wrapper -->
    <div class="mp-pusher" id="mp-pusher" style="transform: translate3d(300px, 0px, 0px);">

      <!-- mp-menu -->

      <nav id="mp-menu" class="mp-menu">

        <div class="mp-level mp-level-open">

          <h2 class="icon icon-cloud">
            <router-link to="/home">Cloud云笔记</router-link>
          </h2>
          <ul >
            <li class="icon icon-arrow-left">

              <a class="icon icon-note" href="#">笔记本</a>

              <div class="mp-level">

                <h2 class="icon icon-note">笔记本</h2>

                <a class="mp-back" href="#">返回</a>

                <ul>

                  <li>

                    <a class="icon icon-pen" href="#" @click="newNoteBook">创建笔记本</a>

                  </li>

                  <li>

                    <a class="icon icon-search" href="#" @click="findNoteBook">搜索笔记本</a>

                  </li>
                  <li class="notebook-list"
                      v-for="item in noteBookList"
                      :key="item.cn_notebook_id">
                    <a class="notebook icon icon-note" href="#">
                      {{item.cn_notebook_name}}
                      <div class="function-area action" style="float: right">
                        <span class="glyphicon glyphicon-edit" @click="resetName(item.cn_notebook_id)"></span>
                        <span v-if="item.cn_notebook_type_id == 2" v-bind="noteBookId" class="glyphicon glyphicon-star"
                              @click="setLike(item.cn_notebook_id)"></span>
                        <span v-else class="glyphicon glyphicon-star-empty" @click="setLike(item.cn_notebook_id)"></span>
                        <span class="icon icon-trash" @click="deleteNoteBook(item.cn_notebook_id)"></span>
                      </div>
                    </a>

                    <!--<div class="-mp-level note-list">-->
                    <!--<h2>{{item.cn_notebook_name}}</h2>-->
                    <!--&lt;!&ndash;<a class="-mp-back" href="#">返回</a>&ndash;&gt;-->
                    <!--<ul>-->
                    <!--<li><a href="#">笔记A-1</a></li>-->
                    <!--<li><a href="#">笔记A-2</a></li>-->
                    <!--<li><a href="#">笔记A-3</a></li>-->
                    <!--<li><a href="#">笔记A-4</a></li>-->
                    <!--</ul>-->
                    <!--</div>-->

                  </li>

                </ul>

              </div>

            </li>

            <li class="icon icon-arrow-left">

              <a class="icon icon-note" href="#">全部笔记</a>

              <div class="mp-level">

                <h2 class="icon icon-note">笔记列表</h2>

                <a class="mp-back" href="#">返回</a>

                <ul>

                  <li><a href="#">笔记1</a></li>

                  <li><a href="#">笔记2</a></li>

                  <li><a href="#">笔记3</a></li>

                  <li><a href="#">笔记4</a></li>

                  <li><a href="#">笔记5</a></li>

                  <li><a href="#">笔记6</a></li>

                </ul>

              </div>

            </li>

            <li class="icon icon-arrow-left">

              <a class="icon icon-tag" href="#">全部标签</a>

              <div class="mp-level">

                <h2 class="icon icon-shop">全部标签</h2>

                <a class="mp-back" href="#">返回</a>

                <ul>

                  <li class="icon icon-arrow-left">

                    <a class="icon icon-tag" href="#">标签1</a>

                    <!--<div class="mp-level">-->

                    <!--<h2 class="icon icon-t-shirt">标签1</h2>-->

                    <!--<a class="mp-back" href="#">返回</a>-->

                    <!--<ul>-->

                    <!--<li class="icon icon-arrow-left">-->

                    <!--<a class="icon icon-female" href="#">Women's Clothing</a>-->

                    <!--<div class="mp-level">-->

                    <!--<h2 class="icon icon-female">Women's Clothing</h2>-->

                    <!--<a class="mp-back" href="#">back</a>-->

                    <!--<ul>-->

                    <!--<li><a href="#">标签1</a></li>-->

                    <!--<li><a href="#">标签2</a></li>-->

                    <!--<li><a href="#">标签3</a></li>-->

                    <!--<li><a href="#">标签4</a></li>-->

                    <!--<li><a href="#">标签5</a></li>-->

                    <!--</ul>-->

                    <!--</div>-->

                    <!--</li>-->

                    <!--<li class="icon icon-arrow-left">-->

                    <!--<a class="icon icon-male" href="#">Men's Clothing</a>-->

                    <!--<div class="mp-level">-->

                    <!--<h2 class="icon icon-male">Men's Clothing</h2>-->

                    <!--<a class="mp-back" href="#">back</a>-->

                    <!--<ul>-->

                    <!--<li><a href="#">Shirts</a></li>-->

                    <!--<li><a href="#">Trousers</a></li>-->

                    <!--<li><a href="#">Shoes</a></li>-->

                    <!--<li><a href="#">Sale</a></li>-->

                    <!--</ul>-->

                    <!--</div>-->

                    <!--</li>-->

                    <!--</ul>-->

                    <!--</div>-->

                  </li>

                  <li>

                    <a class="icon icon-tag" href="#">标签2</a>

                  </li>

                  <li>

                    <a class="icon icon-tag" href="#">标签3</a>

                  </li>

                  <li>

                    <a class="icon icon-tag" href="#">标签4</a>

                  </li>

                </ul>

              </div>

            </li>

            <router-link to="/home/newnote">
              <li><a class="icon icon-pen" href="#">
                创建笔记
              </a></li>
            </router-link>

            <li><a class="icon icon-search" href="#" @click="findNote">搜索笔记</a></li>

            <li><a class="icon icon-trash" href="#">回收站</a></li>
          </ul>


        </div>

      </nav>

      <!-- /mp-menu -->

      <div class="scroller"><!-- this is for emulating position fixed of the nav -->
        <div class="block block-40 clearfix">
          <p><a href="#" id="trigger" class="menu-trigger">
            <!--<span style="">adsa</span>-->
          </a></p>
        </div>
        <div id="content">
          <router-view></router-view>
        </div>
      </div><!-- /scroller -->
    </div><!-- /pusher -->

  </div><!-- /container -->

</template>

<script>
  import store from '../store';
  import swal from 'sweetalert';
  import api from '../api';

  export default {
    name: "Home",
    data() {
      return {
        msg: "",
        noteBookList: [],
        noteBookId: '',
        like: '',
      };
    },
    methods: {
      logout() {
        store.commit('user', null);
        swal('已经退出登陆', '', 'success');
        this.$router.push({path: '/login'});
      },

      findNote() {
        swal({
          title: '搜索你的笔记',
          content: {
            element: 'input',
            attributes: {
              placeholder: "输入笔记相关内容，如：java",
              type: 'text',
            },
          },
          buttons: {
            confirm: {
              text: '搜索笔记',
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
            api.post('/notebook/findNote.do', {
              searchText: val
            }).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.$router.push({path: '/home/shownotebook'});
              }
            });

          })
          .catch(err => {
            swal(err, '', 'error');
          })
        ;
      },

      newNoteBook() {
        swal({
          title: '创建笔记本',
          text: '',
          content: {
            element: 'input',
            attributes: {
              placeholder: "给笔记本起个名字，如：springboot",
              type: 'text',
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
            api.post('/notebook/newNoteBook.do', {
              noteBookName: val,
              userId: store.state.user.cn_user_id,
            }).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                swal('创建成功', '', 'success');
                this.$router.replace({path: '/home'});
              } else {
                swal('创建失败', res.data.msg, 'error');
              }
            });
          });
      },

      findNoteBook() {
        swal({
          title: '搜索你的笔记本',
          content: {
            element: 'input',
            attributes: {
              placeholder: "输入笔记本名称，如：vue.js",
              type: 'text',
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
            api.post('/notebook/findNoteBook.do', {
              searchText: val,
              userId:store.state.user.cn_user_id
            }).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                this.noteBookList = res.data.data;
                this.$router.push({path: '/home'});
              } else {
                swal('搜索失败', res.data.msg, 'error');
              }
            });
          });
      },

      deleteNoteBook(noteBookId) {
        swal({
          title: "你确定要删除吗?",
          text: "",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        })
          .then((willDelete) => {
            if (willDelete) {
                api.post('/notebook/deleteNoteBook.do',{
                   userId:store.state.user.cn_user_id,
                   noteBookId:noteBookId,
                }).then((res)=>{
                   if(res.data.status === 0){
                     swal("已经被删除，可到回收站找回", {
                       icon: "success",
                     });
                   }else{
                     swal("删除失败", {
                       icon: "error",
                     });
                   }
                  console.log(res);
                });
            }
          });
      },

      setLike() {
        if (this.like == 1) {
          api.post('notebook/setNoteBookType.do', {
            userId: store.state.user.cn_user_id,
            noteBookId: this.noteBookId,
            noteBookType:2,
          }).then((res) => {
            console.log(res);
          });
          swal("收藏成功", '', 'success');
        } else {
          swal("已取消收藏", '', 'warning');
        }
      },

      resetName(noteBookId) {
        swal({
          title: '重命名笔记本',
          text: '',
          content: {
            element: 'input',
            attributes: {
              placeholder: "给笔记本起个名字，如：springboot",
              type: 'text',
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
              noteBookId:noteBookId,
              userId: store.state.user.cn_user_id,
            }).then((res) => {
              console.log(res);
              if (res.data.status === 0) {
                swal('重命名成功', '', 'success');
                this.mounted();
                this.$router.replace({path: '/home'});
              } else {
                swal('重命名失败', res.data.msg, 'error');
              }
            });
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
      if (!this.$store.state.user) {
        this.$router.push({path: '/login'});
      }
      new window.mlPushMenu(window.document.getElementById('mp-menu'), window.document.getElementById('trigger'));
    }
  };
</script>

<style scoped lang="stylus">
  @import '../common/slide/jquery-nav-150515164739/css/normalize.css';
  @import '../common/slide/jquery-nav-150515164739/css/demo.css';
  @import '../common/slide/jquery-nav-150515164739/css/icons.css';
  @import '../common/slide/jquery-nav-150515164739/css/component.css';
  .notebook-list
    .notebook
      .function-area
        opacity: 0
        transition: all .3s
      &:hover .function-area
        opacity: 1
</style>
