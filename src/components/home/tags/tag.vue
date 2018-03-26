<template>
  <div class="tag">
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
          <!--<span class="first-font">{{item.label_first_font}}</span>-->
          <div class="tagAll">
            <div class="tag-name">{{item.cn_label_name}}<span class="number">{{item.noteCount}}</span></div>
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
</template>

<script>
  import api from '../../../api';
  import store from '../../../store';
  import baseService from '../../../Service/baseService';
  import tagService from '../../../Service/tagService';

  export default {
    data() {
      return {
        name: 'tag',
        searchText: ''
      };
    },

    computed:{
      labelList(){
        return store.state.main.tagList;
      },
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
        tagService.resetName(id,val);
      }

    },

    watch: {
      searchText: function (value) {
        if (!value) {
          api.post('/label/labelList.do', {
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            if (res.data.status === 0) {
              this.labelList = res.data.data;
              console.log(res);
            }
          });
        } else {
          api.post('/label/findLabelByName.do', {
            searchText: value,
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            if (res.data.status === 0) {
              this.labelList = res.data.data;
              console.log(res);
            }
          });
        }

      }
    },


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
              opacity :0;
              transition: opacity .8s
              span
                margin-right: 10px;
                /*color:*/
              &:hover
                cursor: pointer;

          &:hover .crud
            opacity :1
            transition :opacity .8s
</style>
