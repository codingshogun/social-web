import React from "react";
import { Link } from "react-router-dom";

const NoFeed = () => {
  return (
    <div className="noPosts">
      No Posts in your feed
      <p>
        Follow more <Link to="/searchuser">people</Link>
      </p>
    </div>
  );
};

export default NoFeed;
