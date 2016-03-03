import React from "react";

import * as SearchListActions from "../actions/SearchActions";

export default class SearchList extends React.Component {
  constructor(props) {
    super();
  }
  
  addToPlay(){
	SearchListActions.addToPlayList(this.props);  
  }

  render() {

    return (
		<li onClick={this.addToPlay.bind(this)} title="click to add to play list">
			<img src={this.props.snippet.thumbnails.high.url} />
			<div class="info">
				{this.props.snippet.title}
				<p>{this.props.snippet.channelTitle}</p>
			</div>
		</li>
    );
  }
}