import api from '../api';
import store from '../store';
import baseService from '../Service/baseService';
import swal from "sweetalert";
import notebookService from "./noetbookService";
import tagService from "./tagService";

const trashService = {

  /**
   *彻底删除垃圾箱中笔记和笔记本
   * @param id
   * @param type
   * @returns {Promise<any>}
   */
  deleteExatly(id, type) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      if (type == 1) {
        api.post('/note/deleteByNoteId.do', {
          noteId: id,
        }).then((res) => {
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '彻底删除成功',
              icon: 'success',
              closeOnClickOutside: false,
            }).then((res) => {
              store.commit("noteBookList", baseService.getNoteBookList());
              store.commit("noteList", baseService.getNoteList());
              store.commit("noteTrashList", baseService.findNoteInTrash());
              store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("tagList", baseService.getTagList());
              resolve(res.data.status);
            })
              .catch((error) => {
                if (error.response) reject(error.response.data);
              });
            ;
          }
        });
      } else if (type == 2) {
        api.post('/notebook/deleteByNoteBookId.do', {
          noteBookId: id,
        }).then((res) => {
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '彻底删除成功',
              icon: 'success',
              closeOnClickOutside: false,
            }).then((res) => {
              store.commit("noteBookList", baseService.getNoteBookList());
              store.commit("noteList", baseService.getNoteList());
              store.commit("noteTrashList", baseService.findNoteInTrash());
              store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("tagList", baseService.getTagList());
              resolve(res.data.status);
            })
              .catch((error) => {
                if (error.response) reject(error.response.data);
              });
            ;
          }
        });
      }
    })

      ;
  },

  /**
   *回复垃圾箱中的笔记和笔记本
   * @param id
   * @param type
   * @returns {Promise<any>}
   */
  refresh(item, type) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      if (type === 1) {
        api.post('/note/updateNoteTypeId.do', {
          noteId: item.cn_note_id,
          noteTypeId: 1
        }).then((res) => {
          console.log(res);
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '已还原到笔记列表',
              icon: 'success',
              closeOnClickOutside: false,
            }).then((res) => {
              store.commit("noteBookList", baseService.getNoteBookList());
              store.commit("noteList", baseService.getNoteList());
              store.commit("noteTrashList", baseService.findNoteInTrash());
              store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("tagList", baseService.getTagList());
              if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
                store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
              }
              if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
                store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
              }
              resolve(res.data.status);
            }).catch((error) => {
              if (error.response) reject(error.response.data);
            });
            ;
          }
        });
      } else if (type === 2) {
        api.post('/notebook/setNoteBookType.do', {
          userId: store.state.user.cn_user_id,
          noteBookId: id,
          noteBookType: 1,
          updateType:1
        }).then((res) => {
          console.log(res);
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '已还原到笔记本列表',
              icon: 'success'
            }).then((res) => {
              store.commit("noteBookList", baseService.getNoteBookList());
              store.commit("noteList", baseService.getNoteList());
              store.commit("noteTrashList", baseService.findNoteInTrash());
              store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("tagList", baseService.getTagList());
              resolve(res.data.status);
            }).catch((error) => {
              if (error.response) reject(error.response.data);
            });
          }
        });
      }
    });


  },


};

export default trashService;
