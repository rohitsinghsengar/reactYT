import dispatcher from "../dispatcher";
import YouTubePlayer from 'youtube-player';

var player = YouTubePlayer('player');
player.on('stateChange', (event) => {
    if(!event.data)
		dispatcher.dispatch({type: "PLAY_NEXT"});
});

var query, pageToken;
var searchBtn = document.getElementById("queryButton");
var searchVal = document.getElementById("queryInput");

/* fetch videos for Search query */
searchBtn.addEventListener("click",function(){
	if(!searchVal.value)
		return false;
	
	query = searchVal.value;
	var req = new XMLHttpRequest();
	var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDV82tZNXoB_3w7bjPBnT9Mgxnqb1xlVHQ&maxResults=20";
	if(query) url += "&q=" + encodeURI(query);
	req.open("GET", url);
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var data = JSON.parse(req.responseText);
			data.items = data.items.filter(function(val){
				return val.id.kind == "youtube#video"
			});
			dispatcher.dispatch({type: "RECEIVE_SEARCH_LIST", list: data.items});
			pageToken = data.nextPageToken;
		}
	};
	req.send();
});

/* Load more in Search List */
export function addResults() {
	var req = new XMLHttpRequest();
	var url = "https://www.googleapis.com/youtube/v3/search?part=snippet&key=AIzaSyDV82tZNXoB_3w7bjPBnT9Mgxnqb1xlVHQ&maxResults=20";
	if(query) url += "&q=" + encodeURI(query);
	if(pageToken) url += "&pageToken=" + pageToken;
	req.open("GET", url);
	req.onreadystatechange = function() {
		if (req.readyState == 4 && req.status == 200) {
			var data = JSON.parse(req.responseText);
			data.items = data.items.filter(function(val){
				return val.id.kind == "youtube#video"
			});
			dispatcher.dispatch({type: "ADD_SEARCH_LIST", list: data.items});
			pageToken = data.nextPageToken;
		}
	};
	req.send();
}

/* Update Play List when user clicks search result video */
export function addToPlayList(item) {
	dispatcher.dispatch({type: "ADD_PLAY_LIST", item: item});
}

/* Update Player with new video */
export function nowPlay(item){
	player.loadVideoById(item.id.videoId);
	setTimeout(function(){
		dispatcher.dispatch({type: "UPDATE_CURRENT_PLAY", item: item});
	},1000);
}