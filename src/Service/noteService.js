import api from '../api';
import store from '../store';
import baseService from './baseService';

const noteService = {

  //删除笔记
  deleteNote(noteId, noteTypeId){
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
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
                  store.commit("tagList",baseService.getTagList());
                  store.commit("noteList",baseService.getNoteList());
                  store.commit("noteBookList",baseService.getNoteBookList());
                  store.commit("noteTrashList",baseService.findNoteInTrash());
                  store.commit("noteBookTrashList",baseService.findNoteBookInTrash());
                  store.commit("noteStoreList",baseService.findNoteInStore());
                  store.commit("noteBookStoreList",baseService.findNoteBookInStore());
                  resolve(res.data.data);
                });
              } else {
                swal("删除失败", {
                  icon: "error",
                });
                reject(res);
              }
              console.log(res);
            });
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });

    });

  },

  //收藏笔记
  StoreNote(noteId, noteTypeId){
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
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
              store.commit("noteStoreList",baseService.findNoteInStore());
              store.commit("noteList",baseService.getNoteList());
               resolve(res.data.data);
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
              store.commit("noteStoreList",baseService.findNoteInStore());
              store.commit("noteList",baseService.getNoteList());
              resolve(res.data.data);
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
    });

   },

  //通过相似笔记标题和笔记内容查找相应笔记本中的内容
  SearchText(val,Id){
     return new Promise((resolve=() =>{},reject=()=>{} )=>{
       if(val && Id){
         api.post('/note/findNoteByTitleOrContent.do',{
           searchText:val,
           noteBookId:Id,
           userId:store.state.user.cn_user_id
         }).then((res)=>{
           if(res.data.status === 0){
             console.log(res);
             resolve(res.data.data);
           }else{
             reject(res);
           }
         }).catch((error) => {
           if (error.response) reject(error.response.data);
         });
       }

     });
  }


};

export default noteService;
