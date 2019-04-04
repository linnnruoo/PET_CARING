import React from "react";
import Range from "rc-slider/lib/Range";
import "rc-slider/assets/index.css";

const CustomSlider = ({}) => {
  return (
    <Range
      min={0}
      max={500}
      step={50}
      defaultValue={[20, 200]}
      tipFormatter={value => `${value}%`}
    />
  );
};

export default CustomSlider;
