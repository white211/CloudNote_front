import api from '../api';
import store from '../store';


const baseService = {
  /**
   * 获取笔记本列表
   * @returns {Promise<any>}
   */
  getNoteBookList() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/notebook/noteBookList.do', {userId: store.state.user.cn_user_id})
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteBookList", res.data.data);
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
  /**
   * 获取笔记列表
   * @returns {Promise<any>}
   */
  getNoteList() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/noteList.do', {userId: store.state.user.cn_user_id})
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteList", res.data.data);
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

  /**
   * 获取标签列表
   * @returns {Promise<any>}
   */
  getTagList() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/label/labelList.do', {
        userId: store.state.user.cn_user_id
      }).then((res) => {
        if (res.data.status === 0) {
          store.commit("tagList", res.data.data);
          resolve(res.data.data);
        }
      });
    });
  },

  /**
   *获取垃圾箱中的笔记列表
   * @returns {Promise<any>}
   */
  findNoteInTrash() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/findNoteByTypeId.do', {
        userId: store.state.user.cn_user_id,
        typeId: 4
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteTrashList", res.data.data);
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

  /**
   * 获取垃圾箱中的笔记本列表
   * @returns {Promise<any>}
   */
  findNoteBookInTrash() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/notebook/findNoteBookByTypeId.do', {
        userId: store.state.user.cn_user_id,
        noteBookTypeId: 4
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteBookTrashList", res.data.data);
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

  /**
   * 获取收藏列表中的笔记
   * @returns {Promise<any>}
   */
  findNoteInStore() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/note/findNoteByTypeId.do', {
        userId: store.state.user.cn_user_id,
        typeId: 2
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteStoreList", res.data.data);
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

  /**
   * 获取收藏列表中的笔记本列表
   * @returns {Promise<any>}
   */
  findNoteBookInStore() {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/notebook/findNoteBookByTypeId.do', {
        userId: store.state.user.cn_user_id,
        noteBookTypeId: 2
      })
        .then((res) => {
          if (res.data.status === 0) {
            store.commit("noteBookStoreList", res.data.data);
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

  /**
   * 通过城市获取天气
   * @param city
   * @returns {Promise<any>}
   */
  getWeather(city) {
    return new Promise((resolve = () => {
    }, reject = () => {
    }) => {
      api.post('/user/getWeather.do', {
        city: city
      }).then((res) => {
        if (res.data.status === 0) {
          resolve(res.data.data.results[0]);
        } else {
          reject(res);
        }
      });
    });
  },


};

export default baseService;
