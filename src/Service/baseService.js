import api from '../api';
import store from '../store';


const baseService = {

  getNoteBookList() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/notebook/noteBookList.do', {userId: store.state.user.cn_user_id})
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteBookList",res.data.data);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });
    });
  },

  getNoteList() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/noteList.do', {userId: store.state.user.cn_user_id})
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteList",res.data.data);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });
    });
  },

  getTagList(){
     return new Promise((resolve =() =>{},reject=()=>{})=>{
       api.post('/label/labelList.do', {
         userId: store.state.user.cn_user_id
       }).then((res) => {
         if (res.data.status === 0) {
           store.commit("tagList",res.data.data);
           resolve(res.data.data);
         }
       });
     });
  },

  findNoteInTrash(){
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/findNoteByTypeId.do', {
        userId: store.state.user.cn_user_id,
        typeId: 4
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteTrashList",res.data.data);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });
    });
  },

  findNoteBookInTrash(){
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/notebook/findNoteBookByTypeId.do', {
        userId: store.state.user.cn_user_id,
        noteBookTypeId: 4
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteBookTrashList",res.data.data);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });
    });
  },

  findNoteInStore(){
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/findNoteByTypeId.do', {
        userId: store.state.user.cn_user_id,
        typeId: 2
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteStoreList",res.data.data);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });
    });
  },

  findNoteBookInStore(){
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/notebook/findNoteBookByTypeId.do', {
        userId: store.state.user.cn_user_id,
        noteBookTypeId: 2
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteBookStoreList",res.data.data);
            resolve(res.data.data);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          if (error.response) reject(error.response.data);
        });
    });
  },



};

export default baseService;
