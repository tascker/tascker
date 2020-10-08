import React, { Component } from "react";
import Lottie from "react-lottie";

import work from "../../img/work.json";

class LottieControl extends Component {
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: work,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    return (
      <div>
        <Lottie options={defaultOptions} height={400} width={400} />
      </div>
    );
  }
}

export default LottieControl;
