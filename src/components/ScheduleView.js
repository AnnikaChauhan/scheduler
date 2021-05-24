import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { data } from "../data";

const View = () => {
  const [view, setView] = useState();
  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState currentDate={new Date()} />
        <WeekView
          startDayHour={10}
          endDayHour={19}
          currentViewName={view}
          onCurrentViewNameChange={setView}
        />
        <WeekView
          name="work-week"
          displayName="Work Week"
          excludedDays={[0, 6]}
          startDayHour={9}
          endDayHour={19}
        />
        <MonthView />
        <DayView />

        <Toolbar />
        <ViewSwitcher />
        <Appointments />
      </Scheduler>
    </Paper>
  );
};

export default View;
