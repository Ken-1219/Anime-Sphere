import React from "react";
import { SpinningCircleLoader  } from "react-loaders-kit";
import '../css/loader.css';

function Loader() {

  const loaderProps = {
    loading: true,
    size: 40,
    duration: 2,
    colors: ['#aaa', '#161616']
  }

  return (
    <div className="loader">
        <SpinningCircleLoader  {...loaderProps} />
    </div>
  );
}

export default Loader;