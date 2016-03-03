import React from "react";

import SearchList from "../components/SearchList";
import * as SearchListActions from "../actions/SearchActions";
import SearchListStore from "../stores/SearchListStore";


export default class Search extends React.Component {
  constructor() {
    super();
    this.getResults = this.getResults.bind(this);
    this.state = {
      list: SearchListStore.getList(),
    };
  }

  componentWillMount() {
    SearchListStore.on("change", this.getResults);
  }

  componentWillUnmount() {
    SearchListStore.removeListener("change", this.getResults);
  }

  getResults() {
    this.setState({
      list: SearchListStore.getList(),
    });
  }

  addResults() {
    SearchListActions.addResults();
  }

  render() {
    const { list } = this.state;

    const SearchComponents = list.map((item) => {
        return <SearchList key={item.etag} {...item}/>;
    });

    return (
      <div>
        <ul>{SearchComponents}</ul>
        <button class={(list.length) ? "show" : "hidden"} onClick={this.addResults.bind(this)}>Load More...</button>
      </div>
    );
  }
}
