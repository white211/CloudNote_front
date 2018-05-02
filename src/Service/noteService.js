import api from '../api';
import store from '../store';
import baseService from './baseService';
import tagService from './tagService';
import notebookService from './noetbookService';

const noteService = {

  /**
   * 删除笔记
   * @param item
   * @param noteTypeId
   * @returns {Promise<any>}
   */
  deleteNote(item, noteTypeId) {
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
              noteId: item.cn_note_id,
              noteTypeId: noteTypeId
            }).then((res) => {
              if (res.data.status === 0) {
                swal("已经被删除，可到回收站找回", {
                  icon: "success",
                  timer: 3000
                }).then(value => {
                  store.commit("tagList", baseService.getTagList());
                  store.commit("noteList", baseService.getNoteList());
                  store.commit("noteBookList", baseService.getNoteBookList());
                  store.commit("noteTrashList", baseService.findNoteInTrash());
                  store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
                  store.commit("noteStoreList", baseService.findNoteInStore());
                  store.commit("noteBookStoreList", baseService.findNoteBookInStore());
                  if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
                    store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
                  }
                  if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
                    store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
                  }
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

  /**
   * 收藏笔记
   * @param item
   * @param noteTypeId
   * @returns {Promise<any>}
   * @constructor
   */
  StoreNote(item, noteTypeId) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/updateNoteTypeId.do', {
        noteId: item.cn_note_id,
        noteTypeId: noteTypeId
      }).then((res) => {
        if (noteTypeId == 1) {
          if (res.data.status === 0) {
            swal({
              title: '已取消收藏',
              timer: 3000,
              icon: 'success'
            }).then(value => {
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("noteList", baseService.getNoteList());
              if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
                store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
              }
              if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
                store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
              }
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
              store.commit("noteStoreList", baseService.findNoteInStore());
              store.commit("noteList", baseService.getNoteList());
              if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
                store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
              }
              if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
                store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
              }
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

  /**
   * 通过相似笔记标题和笔记内容查找相应笔记本中的内容
   * @param val
   * @param Id
   * @returns {Promise<any>}
   * @constructor
   */
  SearchText(val, Id) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      if (val && Id) {
        api.post('/note/findNoteByTitleOrContent.do', {
          searchText: val,
          noteBookId: Id,
          userId: store.state.user.cn_user_id
        }).then((res) => {
          if (res.data.status === 0) {
            console.log(res);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        }).catch((error) => {
          if (error.response) reject(error.response.data);
        });
      }

    });
  },

  /**
   * 加密解密笔记
   * @param item
   * @param encryptType
   * @returns {Promise<any>}
   */
  encrypt(item, encryptType) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/updateEncrypt.do', {
        noteId: item.cn_note_id,
        encryptType: encryptType
      }).then((res) => {
        if (encryptType == 0) {
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '已加密',
              icon: 'success',
              timer: 2000
            }).then(value => {
              store.commit("noteList", baseService.getNoteList());
              if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
                store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
              }
              if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
                store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
              }
              resolve(res.data.data);
            });
          } else {
            swal({
              title: '',
              text: '加密失败',
              icon: 'error',
              timer: 2000
            });
          }
        } else if (encryptType == 1) {
          if (res.data.status === 0) {
            swal({
              title: '',
              text: '已取消加密',
              icon: 'success',
              timer: 2000
            }).then(value => {
              store.commit("noteList", baseService.getNoteList());
              if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
                store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
              }
              if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
                store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
              }
              resolve(res.data.data);
            });
          } else {
            swal({
              title: '',
              text: '取消加密失败',
              icon: 'error',
              timer: 2000
            });
          }
        }
      });
    });
  },

  /**
   * 浏览笔记内容
   * @param note
   * @returns {Promise<any>}
   */
  skim(note) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      if (note.cnNoteIsEncrypt === 0) {
        swal({
          title: '阅读密码',
          text: '',
          content: {
            element: 'input',
            attributes: {
              type: 'password',
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
        }).then((val) => {
          api.post('/note/checkReadPassword.do', {
            readPass: val,
            userId: note.cn_user_id
          }).then((res) => {
            if (res.data.status === 0) {
              resolve(true);
              // this.$router.push({path: `/home/newNote/${note.cn_note_id}`});
            } else {
              swal({
                title: '',
                text: '密码错误',
                icon: 'error',
                timer: 1500
              }).then((res) => {
                resolve(false);
              });
            }
          });
        });
      } else {
        resolve(true);
        // this.$router.push({path: `/home/newNote/${note.cn_note_id}`});
      }
    }).then((res) => {
      return res;
    });
  },

  /**
   * 分享笔记的操作
   * @param item
   * @param shareType
   * @returns {Promise<any>}
   */
  shareNote(item, shareType) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post("/note/updateNoteIsShare.do", {
        noteId: item.cn_note_id,
        type: shareType
      }).then((res) => {
        if (res.data.status === 0) {
          store.commit("noteList", baseService.getNoteList());

          if (item.cn_note_label_id !== '' && item.cn_note_label_id !== null) {
            store.commit("noteListInTag", tagService.findNoteByNoteTagId(item.cn_note_label_id));
          }

          if (item.cn_note_book_id !== '' && item.cn_note_book_id !== null) {
            store.commit("noteListInBook", notebookService.findNoteByNoteBookId(item.cn_note_book_id));
          }
          resolve(res.data.data);
        } else {
          reject();
        }
      });
    });
  }

};

export default noteService;
