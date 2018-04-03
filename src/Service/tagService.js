import api from '../api';
import store from '../store';
import baseService from "./baseService";

const tagService = {

  //新建标签
  newLabel() {
    swal({
      title: "新建标签",
      text: "",
      buttons: true,
      dangerMode: true,
      content: {
        element: 'input',
        attributes: {
          placeholder: "给标签名字，如：java",
          type: 'text',
        },
      },
    })
      .then((val) => {
        if (val) {
          api.post('/label/newLabel.do', {
            userId: store.state.user.cn_user_id,
            labelName: val,
          }).then((res) => {
            if (res.data.status === 0) {
              swal({
                title: '创建成功',
                icon: 'success',
                timer: 3000,
              }).then(value => {
                store.commit("tagList", baseService.getTagList());
                resolve(res.data.data);
              });
            } else {
              swal('创建失败', res.data.msg, 'error');
            }
          });
        }
      });
  },

  //删除标签
  deleteLabel(id) {
     return new Promise((resolve=()=>{},reject=()=>{})=>{
       swal({
         title: "你确定要删除吗?",
         text: "",
         icon: "warning",
         buttons: true,
         dangerMode: true,
       })
         .then((willDelete) => {
           if (willDelete) {
             api.post('/label/deleteLabel.do', {
               userId: store.state.user.cn_user_id,
               labelId: id,
             }).then((res) => {
               if (res.data.status === 0) {
                 swal("该标签已经被删除", {
                   icon: "success",
                   timer: 3000
                 }).then(value => {
                   store.commit("tagList",baseService.getTagList());
                   store.commit("noteList",baseService.getNoteList());
                   store.commit("noteBookList",baseService.getNoteBookList());
                   resolve(res.data.data);
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
     })
  },

  //重命名标签
  resetName(id, val){
     return new Promise((resolve =() =>{},reject=()=>{} )=>{
       swal({
         title: '重命名标签名',
         text: '',
         content: {
           element: 'input',
           attributes: {
             type: 'text',
             value: val
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
           api.post('/label/updateLabelName.do', {
             newName: val,
             labelId: id,
             userId: store.state.user.cn_user_id,
           }).then((res) => {
             console.log(res);
             if (res.data.status === 0) {
               swal('重命名成功', '', 'success').then(value => {
                 store.commit("tagList",baseService.getTagList());
                 resolve(res.data.data);
               });
             } else {
               swal('重命名失败', res.data.msg, 'error');
             }
           });
         });
     });
  }


};
export default tagService;
