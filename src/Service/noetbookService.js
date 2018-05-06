import api from '../api';
import store from '../store';
import baseService from '../Service/baseService';

const noteBookService = {

  /**
   * 新建笔记本
   * @returns {Promise<any>}
   */
  newNoteBook() {

    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
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
                  timer: 2000,
                }).then(value => {
                  store.commit("noteBookList", baseService.getNoteBookList());
                  resolve(res.data.data);
                }).catch();
              } else {
                swal('创建失败', res.data.msg, 'error');
              }
            });
          }
        });
    });

  },

  /**
   * 删除笔记本
   * @param id
   * @returns {Promise<any>}
   */
  deleteNoteBook(id) {
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
            api.post('/notebook/setNoteBookType.do', {
              userId: store.state.user.cn_user_id,
              noteBookId: id,
              noteBookType: 4,
              updateType:1
            }).then((res) => {
              // console.log(res);
              if (!res) return;
              if (res.data.status === 0) {
                swal("已经被删除，可到回收站找回", {
                  icon: "success",
                  timer: 2000
                }).then(value => {
                  store.commit("noteBookList", baseService.getNoteBookList());
                  store.commit("noteList", baseService.getNoteList());
                  store.commit("noteTrashList", baseService.findNoteInTrash());
                  store.commit("noteBookTrashList", baseService.findNoteBookInTrash());
                  store.commit("noteBookStoreList", baseService.findNoteBookInStore());
                  store.commit("noteStoreList", baseService.findNoteInStore());
                  store.commit("tagList", baseService.getTagList());
                  resolve(res.data.data);
                });
              } else {
                swal({
                  title:'',
                  text:'删除失败',
                  icon:'error',
                  timer:2000,
                  button:false
                });
              }
            });
          }
        });
    });
  },

  /**
   * 重命名笔记本名称
   * @param id
   * @param val
   * @returns {Promise<any>}
   */
  resetNoteBookName(id, val) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      swal({
        title: '重命名笔记本',
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
          api.post('/notebook/resetName.do', {
            newName: val,
            noteBookId: id,
            userId: store.state.user.cn_user_id,
          }).then((res) => {
            console.log(res);
            if (res.data.status === 0) {
              swal('重命名成功', '', 'success').then(value => {
                store.commit("noteBookList", baseService.getNoteBookList());
                store.commit("noteList", baseService.getNoteList());
                resolve(res.data.data);
              });
            } else {
              swal('重命名失败', res.msg, 'error');
            }
          });
        });
    });
  },

  /**
   * 收藏笔记本
   * @param id
   * @param type
   * @returns {Promise<any>}
   * @constructor
   */
  Store(id, type) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('notebook/setNoteBookType.do', {
        userId: store.state.user.cn_user_id,
        noteBookId: id,
        noteBookType: type
      }).then((res) => {
        if (type == 1) {
          if (res.data.status === 0) {
            swal({
              title: '已取消收藏',
              timer: 2000,
              icon: 'success'
            }).then(value => {
              store.commit("noteBookList", baseService.getNoteBookList());
              store.commit("noteList", baseService.getNoteList());
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              resolve(res.data.data);
            });
          } else {
            swal({
              title: '取消收藏失败',
              timer: 2000,
              icon: 'error'
            });
          }
        } else if (type == 2) {
          if (res.data.status === 0) {
            swal({
              title: '收藏成功',
              timer: 2000,
              icon: 'success'
            }).then(value => {
              store.commit("noteBookList", baseService.getNoteBookList());
              store.commit("noteList", baseService.getNoteList());
              store.commit("noteBookStoreList", baseService.findNoteBookInStore());
              resolve(res.data.data);
            });
          } else {
            swal({
              title: '收藏失败',
              timer: 2000,
              icon: 'error'
            });
          }
        }
      });
    });
  },

  /**
   * 通过笔记本id查找笔记
   * @param bookId
   * @returns {Promise<any>}
   */
  findNoteByNoteBookId(bookId){
    return new Promise((resolve =()=>{},reject=()=>{})=>{
      api.post('/note/findNoteByBookId.do',{
        bookId:bookId
      }).then((res)=>{
          if(res.data.status ===0){
            store.commit("noteListInBook",res.data.data);
             resolve(res.data.data);
          }else {
            reject();
          }
      });
    })
  }

};

export default noteBookService;
