import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class SearchListStore extends EventEmitter {
  constructor() {
    super()
    this.searchList = [];
  }

  addList(list) {
    this.searchList = this.searchList.concat(list);
    this.emit("change");
  }

  getList() {
    return this.searchList;
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_SEARCH_LIST": {
        this.addList(action.list);
      }
	  break;
      case "RECEIVE_SEARCH_LIST": {
        this.searchList = action.list;
        this.emit("change");
      }
	  break;
    }
  }

}

const searchListStore = new SearchListStore;
dispatcher.register(searchListStore.handleActions.bind(searchListStore));

export default searchListStore;
