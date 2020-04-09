import React, { useState, useEffect } from "react";
import { browserHistory } from "react-router";

const Timer = () => {
  //   const calculateTime = () => {
  //     const difference = time - 1;
  //     time = time - 1;
  //     //   Calculations based on gameplay go here
  //     return difference;
  //   };
  const [time, setTime] = useState(10);
  useEffect(() => {
    let timer = setTimeout(() => {
      setTime(time - 1);
    }, 1000);
    if (time <= 0) {
      // alert("score modal here");
      clearTimeout(timer);
      browserHistory.push("/");
      return;
    }
  }, [time]);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
};

export default Timer;
