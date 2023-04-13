import { scaleBand } from "@devexpress/dx-chart-core";
import {
  Animation,
  ArgumentScale,
  EventTracker,
} from "@devexpress/dx-react-chart";
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  Tooltip,
  ValueAxis,
} from "@devexpress/dx-react-chart-material-ui";
import { Container, Typography } from "@mui/material";

import Paper from "@mui/material/Paper";
import dayjs from "dayjs";
import * as React from "react";


export default function TransactionChart({ data }) {
  const chartData = data.map((item) => {
    item.month = dayjs().month(item._id-1).format("MMMM");
    return item;
  });
  return (
    <Container maxWidth='lg' className="input-form">
    <Typography variant="h6" paddingBottom={1}>
      Monthly expense chart
    </Typography>
    <Paper>
      <Chart data={chartData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalExpenses" argumentField="month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
    </Container>
  );
}