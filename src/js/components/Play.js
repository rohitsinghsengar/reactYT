import React from "react";

import PlayList from "../components/PlayList";
import * as SearchListActions from "../actions/SearchActions";
import PlayListStore from "../stores/PlayListStore";


export default class Play extends React.Component {
  constructor() {
    super();
    this.getListToPlay = this.getListToPlay.bind(this);
    this.state = {
      list: PlayListStore.getPlayList(),
    };
  }

  componentWillMount() {
    PlayListStore.on("change", this.getListToPlay);
  }

  componentWillUnmount() {
    PlayListStore.removeListener("change", this.getListToPlay);
  }

  getListToPlay() {
    this.setState({
      list: PlayListStore.getPlayList(),
    });
  }

  render() {
    const { list } = this.state;
	
    const PlayListComponents = list.map((item, i) => {
        return <PlayList active={PlayListStore.index == i} key={item.etag} {...item}/>;
    });

    return (
        <ul>{PlayListComponents}</ul>
    );
  }
}
