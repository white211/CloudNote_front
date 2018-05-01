import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const store = new Vuex.Store({

  plugins: [createPersistedState()],

  state: {
    token: '',
    lastAuthTime: Date.now(),
    user: null,
    account: null,
    main: {
      noteBookList: [],
      noteList: [],
      labelList: [],
      tagList: [],
    },
    trashList: {
      noteTrashList: [],
      noteBookTrashList: []
    },
    storeList: {
      noteStoreList: [],
      noteBookStoreList: []
    },
    noteListInBook:[],
    noteListInTag:[],
    updatePass:{
      firstStep:{
        status:''
      },
      secondStep:{
        status:''
      },
      thirdStep:{
        status:''
      }
    }
  },

  mutations: {
    token(state, val) {
      state.token = val;
    },
    lastAuthTime(state, val) {
      state.lastAuthTime = val;
    },
    user(state, val) {
      state.user = val;
    },
    account(state, val) {
      state.account = val;
    },
    noteList(state, val) {
      state.main.noteList = val;
    },
    noteBookList(state, val) {
      state.main.noteBookList = val;
    },
    labelList(state, val) {
      state.main.labelList = val;
    },
    tagList(state, val) {
      state.main.tagList = val;
    },
    noteTrashList(state, val) {
      state.trashList.noteTrashList = val;
    },
    noteBookTrashList(state, val) {
      state.trashList.noteBookTrashList = val;
    },
    noteStoreList(state, val) {
      state.storeList.noteStoreList = val;
    },
    noteBookStoreList(state, val) {
      state.storeList.noteBookStoreList = val;
    },

    noteListInBook(state,val){
      state.noteListInBook = val;
    },

    noteListInTag(state,val){
      state.noteListInTag = val;
    },

    firstStepStatus(state,val){
      state.updatePass.firstStep.status = val;
    },

    secondStepStatus(state,val){
      state.updatePass.secondStep.status = val;
    },

    thirdStepStatus(state,val){
      state.updatePass.thirdStep.status = val;
    },

  },
});

export default store;
