import React from "react";
import { VictoryPie } from "victory";

export const Chart = ({data}) => {
  return (
    <VictoryPie
      colorScale={["tomato", "orange", "gold", "cyan", "navy"]}
      data={data}
    />
  );
};
