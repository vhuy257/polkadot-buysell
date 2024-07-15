"use client";
import React from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { formatDate } from "@/lib/format";
import moment from "moment";
import { useAtomValue } from "jotai";
import { dataHistory } from "@/lib/atom";

export type DataChart = {
  id: number;
  dot_amount: number;
  dot_price: number;
  usdt_amount: number;
  usdt_price: number;
  total_vnd: number;
  created_at: string;
  type: "BUY" | "SELL";
};

const Chart = () => {
  const data: any = useAtomValue(dataHistory);

  const options = {
    credits: {
      enabled: false,
    },
    min: 0,
    max: 4,
    chart: {
      type: "column",
      style: {
        fontFamily: 'inherit'
      }
    },
    title: {
      text: "",
      align: "",
    },
    subtitle: {
      text: "",
      align: "left",
    },
    xAxis: {
      lineColor: '#eee',
      categories: data.map((k: any) => {
        return k.updated_date
          ? moment(k.updated_date).format("DD/MM/YYYY")
          : formatDate(k.created_at);
      }),
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },
    tooltip: {
      valueSuffix: "",
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        type: "column",
        name: "DOT Amount",
        data: data.map((m: any) => m.dot_amount),
      },
      {
        type: "column",
        name: "DOT Price",
        data: data.map((m: any) => m.dot_price),
      },
      {
        type: "spline",
        name: "USDT Amount",
        data: data.map((m: any) => m.usdt_amount),
      },
      // {
      //   type: "spline",
      //   name: "Type",
      //   data: data.map((m: any) => m.type),
      // },
    ],
  };
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
    />
  );
};

export default Chart;
