import React, { useState, useEffect } from "react";

const Timer = () => {
  //   const calculateTime = () => {
  //     const difference = time - 1;
  //     time = time - 1;
  //     //   Calculations based on gameplay go here
  //     return difference;
  //   };
  const [time, setTime] = useState(30);
  useEffect(() => {
    setTimeout(() => {
      setTime(time - 1);
      if (time <= 0) {
        alert("score modal here");
      }
    }, 1000);
  }, [time]);

  return (
    <div>
      <h1>{time}</h1>
    </div>
  );
};

export default Timer;
