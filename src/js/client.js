import React from "react";
import ReactDOM from "react-dom";

import Search from "./components/Search";
import Play from "./components/Play";

const list = document.getElementById('searchList');
const playlist = document.getElementById('playList');

ReactDOM.render( <Search/>, list);
ReactDOM.render( <Play/>, playlist);

