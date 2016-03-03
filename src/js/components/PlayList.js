import React from "react";

import * as SearchListActions from "../actions/SearchActions";

export default class PlayList extends React.Component {
  constructor(props) {
    super();
  }
  
  playNow(){
	SearchListActions.nowPlay(this.props);  
  }

  render() {

    return (
		<li class={this.props.active ? "active" : ""} onClick={this.playNow.bind(this)}  title="click to play">
			<img src={this.props.snippet.thumbnails.high.url} />
			<div class="info">
				{this.props.snippet.title}
				<p>{this.props.snippet.channelTitle}</p>
			</div>
		</li>
    );
  }
}