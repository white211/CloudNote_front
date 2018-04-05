import api from '../api';
import store from '../store';
import baseService from "./baseService";

const storeService = {

  //取消收藏
  Cancel(id, type) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      if (type === 1) {
        api.post('/note/updateNoteTypeId.do', {
          noteId: id,
          noteTypeId: 1
        }).then((res) => {
          console.log(res);
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '已取消快捷方式',
              icon: 'success'
            }).then((res) => {
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("noteList", baseService.getNoteList());
              resolve(res.data.data);
            }).catch((error) => {
              if (error.response) reject(error.response.data);
            });
          }
        });
      } else if (type === 2) {
        api.post('/notebook/setNoteBookType.do', {
          userId: store.state.user.cn_user_id,
          noteBookId: id,
          noteBookType: 1
        }).then((res) => {
          console.log(res);
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '已取消快捷方式',
              icon: 'success'
            }).then((res) => {
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              store.commit("noteBookList", baseService.getNoteBookList());
              resolve(res.data.data);
            }).catch((error) => {
              if (error.response) reject(error.response.data);
            });
          }
        });
      }
    });
  }

};
export default storeService;
