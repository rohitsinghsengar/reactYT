import { EventEmitter } from "events";

import * as SearchListActions from "../actions/SearchActions";

import dispatcher from "../dispatcher";

class PlayListStore extends EventEmitter {
  constructor() {
    super();
	this.index;
    this.playList = JSON.parse(localStorage.getItem('myPlayList')) || [];
  }

  addToList(item) {
    this.playList.push(item);
	localStorage.setItem('myPlayList', JSON.stringify(this.playList));
  }
  
  updateCurrent(item){
	  this.index = this.playList.findIndex(function(x){
		  return x.etag == item.etag;
	  });
  }
  
  playNext(){
	  if(this.index < this.playList.length-1){
		  this.index += 1;
		  SearchListActions.nowPlay(this.playList[this.index]);
	  }else{
		  return false;
	  }
  }

  removeFromList(id) {
	//to-do
	//localStorage.setItem('myPlayList', this.playList);
  }

  getPlayList() {
    return this.playList;
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_PLAY_LIST": {
        this.addToList(action.item);
		this.emit("change");
      }
	  break;
      case "UPDATE_CURRENT_PLAY": {
        this.updateCurrent(action.item);
        this.emit("change");
      }
	  break;
      case "PLAY_NEXT": {
        this.playNext(action.item);
        this.emit("change");
      }
	  break;
      case "DELETE_PLAY_LIST": {
        this.removeFromList(action.item);
        this.emit("change");
      }
	  break;
    }
  }

}

const playListStore = new PlayListStore;
dispatcher.register(playListStore.handleActions.bind(playListStore));

export default playListStore;
