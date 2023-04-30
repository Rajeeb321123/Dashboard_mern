import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetSalesQuery } from "state/api";



// isDashboard is false as default if we arenot in dashboard page . false means we are in overview page
const OverviewChart = ({ isDashboard = false, view }) => {

  const theme = useTheme();
  const { data, isLoading } = useGetSalesQuery();

  // formatting data in frontend as we can  format for each 4 pages with same endpoint or data from backend
  // useMemo saves the data in cache of browser so, it doesnot recalculte any other time beside data is changed
  // we useMemo for getting rid for unnecessary recalultaions 
  const [totalSalesLine, totalUnitsLine] = useMemo(() => {

    // no data then empry array is send
    if (!data) return [];

    const { monthlyData } = data;

    // look at line nivo docs why we format it like below
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };


    // reducing our value of data we got from backend . reduce() from khan academy on how it works
    Object.values(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {

        // we increase our sales each month
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        // look at line doc from nivo for knowing about x: and y: 
        totalSalesLine.data = [
          ...totalSalesLine.data,
          // we adding X: and y: to array of data which is property of totalSalesLine object we created above
          { x: month, y: curSales },
        ];
        totalUnitsLine.data = [
          ...totalUnitsLine.data,
          { x: month, y: curUnits },
        ];

        return { sales: curSales, units: curUnits };
      },

      // initial value
      { sales: 0, units: 0 }
    );

    // return of our  const [totalSalesLine, totalUnitsLine] = useMemo(() =>   useMemo()_method
    // useMemo must have return statemenet
    return [[totalSalesLine], [totalUnitsLine]];




    // data is dependency for   our const [totalSalesLine, totalUnitsLine] = useMemo(() => { above
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";

  return (




    // we copied this edited line code from nivo website .We can further modify here
    <ResponsiveLine

    // setting data different if our 2 different views : sales and unit
      data={view === "sales" ? totalSalesLine : totalUnitsLine}

      // modify the theme and color of the line ourself
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}


      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{

        // if we are in dashboard and not in dashboard page as dashboard has less space so we need to cut it
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,

        // no legend if we are in dashboard
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      
      // no legend if we arein dasboard
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;