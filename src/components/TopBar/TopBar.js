import React from "react";
import Logout from "../Auth/Logout";

import "./top-bar.css";

const TopBar = (props) => (
  <div className="top-bar">
    <div className="left-container">
      <a href="/users" className="link">
        <button className="button back-button">
          <b>&#8249;&#8249; Back</b>
        </button>
      </a>
      <h3> {props.title}</h3>
    </div>
    <Logout />
  </div>
);

export default TopBar;
