<template xmlns:v-clipboard="http://www.w3.org/1999/xhtml">

  <div class="tag" v-if="flag">
    <div class="tag-top">
      <span class="text">标签</span>
      <span class="fa fa-plus plus" title="创建标签" @click="newLabel"></span>
    </div>
    <div class="tag-search-box">
      <input type="text" class="" name="search-text" placeholder="查找标签" v-model="searchText"/>
    </div>
    <div class="labelList" v-if="labelList.length != 0">
      <ul>
        <li v-for="item in labelList">
          <div class="tagAll">
            <div class="tag-name" @click="openTag(item.cn_label_id,item.cn_label_name)">
              {{item.cn_label_name}}<span class="number">{{item.noteCount}}</span></div>
            <div class="crud">
              <span class="fa fa-pencil-square-o" title="重命名"
                    @click="resetName(item.cn_label_id,item.cn_label_name)"></span>
              <span class="fa fa-trash-o" title="删除" @click="deleteLabel(item.cn_label_id)"></span>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="tag-logo" v-else>
      <span class="fa fa-tags logo"></span>
      <span>还没有标签？</span>
      <span>赶快<i>点击<i class="fa fa-plus"></i>号</i>添加吧</span>
    </div>

  </div>

  <div class="second" v-else>

    <div class="second-top">
         <span class="fa fa-hand-o-left return" @click="closeTag">
          返回标签
       </span>

      <div class="tag-name">
        <span>标签：{{name}}</span>
      </div>

      <div class="second-selectbar">
        <span>{{noteListInTag.length}}条记录</span>
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

    <div class="second-noteList" v-if="noteListInTag.length !== 0">
      <ul>
        <li v-for="item in noteListInTag" v-if="item.cn_note_type_id !== 4">
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
            <span class="fa a-lock" title="加密" v-else @click="encrypt(item,0)"></span>

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
  import api from '../../../api';
  import store from '../../../store';
  import baseService from '../../../Service/baseService';
  import tagService from '../../../Service/tagService';
  import noteService from '../../../Service/noteService';

  export default {

    data() {
      return {
        name: 'tag',
        searchText: '',
        flag: true,
        message: '',
        name: '',
        noteList: [],
        index: ''
      };
    },

    computed: {
      labelList() {
        return store.state.main.tagList;
      },
      noteListInTag(){
        return store.state.noteListInTag;
      }

    },

    mounted() {

      baseService.getTagList();

    },

    methods: {

      newLabel() {
        tagService.newLabel();
      },

      deleteLabel(id) {
        tagService.deleteLabel(id);
      },

      resetName(id, val) {
        tagService.resetName(id, val);
      },

      openTag(id, name) {
        this.index = id;
        this.name = name;
        setTimeout(_ => {
          this.flag = false;
          tagService.findNoteByNoteTagId(id);
        }, 300);

      },

      closeTag() {
        setTimeout(_ => {
          this.flag = true;
          this.index='';
          this.name='';
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
      shareNote(item,sharetype) {
        this.userId = store.state.user.cn_user_id;
        this.noteId = item.cn_note_id;
        this.message = window.location.origin + '/note/shareNote/' + this.userId + '/' + item.cn_note_id;
        if (sharetype == 1) {
          noteService.shareNote(item, sharetype).then((res) => {
            swal({
              title:'',
              text:'已取消',
              icon:'success',
              timer:2000,
            });
          });
        } else {
          noteService.shareNote(item, sharetype);
        }
      },
      deleteNote(noteId, noteTypeId) {
        noteService.deleteNote(noteId, noteTypeId).then((res)=>{
          tagService.findNoteByNoteTagId(this.index);

        });
      },
      StoreNote(noteId, noteTypeId) {
        noteService.StoreNote(noteId, noteTypeId).then((res)=>{
          tagService.findNoteByNoteTagId(this.index);
        });
      },
      skim(value) {
        noteService.skim(value).then((res)=>{
          if(res){
            this.$router.push({path: `/home/newNote/${value.cn_note_id}`});
          }
        });
      },
      encrypt(item, encrypyType) {
        noteService.encrypt(item, encrypyType).then((res)=>{
          tagService.findNoteByNoteTagId(this.index);
        });
      },

      handleCommand(command) {
        //创建时间（最早优先）
        if (command === 'a') {
          this.noteList = store.state.noteListInTag;
          this.noteList.sort(this.compare('cnNoteCreateTime', 1));
          store.commit("noteListInTag", this.noteList);
          //创建时间（最新优先）
        } else if (command === 'b') {
          this.noteList = store.state.noteListInTag;
          this.noteList.sort(this.compare('cnNoteCreateTime', -1));
          store.commit("noteListInTag",  this.noteList);
          //更新时间（最早优先）
        } else if (command === 'c') {
          this.noteList = store.state.noteListInTag;
          this.noteList.sort(this.compare('cnNoteUpdateTime', -1));
          store.commit("noteListInTag",  this.noteList);

          //更新时间（最新优先）
        } else {
          this.noteList = store.state.noteListInTag;
          this.noteList.sort(this.compare('cnNoteUpdateTime', 1));
          store.commit("noteListInTag",  this.noteList);
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

    watch: {
      searchText: function (value) {
        if (!value) {
          api.post('/label/labelList.do', {
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            if (res.data.status === 0) {
              store.commit("tagList", baseService.getTagList());
            }
          });
        } else {
          api.post('/label/findLabelByName.do', {
            searchText: value,
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            if (res.data.status === 0) {
              store.commit("tagList", res.data.data);
            }
          });
        }

      }
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
  .tag
    display: flex
    flex-direction: column
    .tag-top
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
    .tag-search-box
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
        padding-left :8px;
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

    .tag-logo
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
    .labelList
      overflow-y: scroll
      overflow-x: hidden
      flex: 1
      ul
        li
          width: 400px;
          height: 60px;
          padding-top: 30px;
          padding-left: 25px;
          padding-right: 10px;
          .first-font
            font-size: 20px;
            width: 350px;
            display: block;
            color: #687b7c
          .tagAll
            height: 40px;
            line-height: 40px;
            .tag-name
              display: inline-block
              height: 25px;
              line-height: 25px;
              border: 1px solid #6a797a
              border-radius: 4px;
              margin-top: 10px;
              padding-right: 10px;
              background-color: #f8f8f8
              padding-left: 5px;
              cursor: pointer
              font-size: 16px
              .number
                margin-left: 10px;
                color: #2dbe60;
              &:hover
                color: white
                background-color: #2dbe60
                transition: all .3s
                .number
                  color: white;
                  transition: all .3s
            .crud
              display: inline-block
              margin-left: 18px;
              font-size: 16px;
              opacity: 0;
              transition: opacity .8s
              span
                margin-right: 10px;
              /*color:*/
              &:hover
                cursor: pointer;

          &:hover .crud
            opacity: 1
            transition: opacity .8s

  .second
    display: flex
    flex-direction: column
    .second-top
      width: 400px;
      height: 180px;
      border-bottom: 1.2px solid rgba(0, 0, 0, 0.2)
    .return
      width: 400px;
      height: 50px;
      line-height: 50px;
      display: block;
      padding-left: 10px;
      padding-right: 10px;
      color: rgba(0, 0, 0, 0.5);
      &:hover
        cursor: pointer;

    .tag-name
      width: 400px;
      height: 80px;
      text-align: center;
      line-height: 80px;
      span
        font-size: 25px;
        color: rgba(0, 0, 0, 0.4);
    .second-selectbar
      display: block;
      width: 400px;
      height: 50px;
      margin: 0 auto;
      padding-left: 20px;
      padding-right: 20px;
      line-height: 50px;
      color: rgba(0, 0, 0, 0.4)
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
            text-align: center;
            padding-top: 10px;
            opacity: 0
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
