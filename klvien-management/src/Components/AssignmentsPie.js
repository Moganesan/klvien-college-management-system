import { useEffect, useState } from "react";
import Styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";

const Container = Styled.div`
   width: 320px;
   height: 320px;
   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.07);
   border-radius: 30px;
   @media only screen and (max-width: 425px){
     width: 370px;
     height: 300px;
   }
   @media only screen and (max-width: 320px){
     width: 300px;
     height: 250px;
   }
`;

const AssignmentsPie = ({ data }) => {
  return (
    <Container>
      <ResponsivePie
        data={[
          {
            id: "Assignment Completed",
            label: "Completed",
            value: data.assignmentCompletedPercentage,
            color: "hsl(249, 70%, 50%)",
          },
          {
            id: "Assignment Checking",
            label: "Checking",
            value: data.assignmentCheckingPercentage,
            color: "hsl(102, 70%, 50%)",
          },
          {
            id: "Assignment Pending",
            label: "Pending",
            value: data.assignmentPendingPercentage,
            color: "hsl(102, 70%, 50%)",
          },
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={0}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{ from: "color", modifiers: [["darker", 2]] }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255, 255, 255, 0.3)",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "ruby",
            },
            id: "dots",
          },
          {
            match: {
              id: "c",
            },
            id: "dots",
          },
          {
            match: {
              id: "go",
            },
            id: "dots",
          },
          {
            match: {
              id: "python",
            },
            id: "dots",
          },
          {
            match: {
              id: "scala",
            },
            id: "lines",
          },
          {
            match: {
              id: "lisp",
            },
            id: "lines",
          },
          {
            match: {
              id: "elixir",
            },
            id: "lines",
          },
          {
            match: {
              id: "javascript",
            },
            id: "lines",
          },
        ]}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "#000",
                },
              },
            ],
          },
        ]}
      />
    </Container>
  );
};

export default AssignmentsPie;
