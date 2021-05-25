import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import { Plugin } from "@devexpress/dx-react-core";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  // ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { data } from "../data";
import Switcher from "./ViewSwitcher";

const View = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("Month");

  const handleCurrentDateChange = (date) => {
    // console.log(date);
    // ! call to endpoint can go here
    setCurrentDate(date);
  };

  const handleCurrentViewChange = (event) => {
    // console.log(event.target.value);
    // ! call to endpoint can go here
    setCurrentView(event.target.value);
  };

  return (
    <>
      <Switcher
        currentViewName={currentView}
        onChange={handleCurrentViewChange}
      />
      <Paper>
        <Scheduler
          data={data}
          // can give a max height to the component
          // height={660}
        >
          <ViewState
            currentDate={currentDate}
            onCurrentDateChange={handleCurrentDateChange}
            currentViewName={currentView}
            onCurrentViewNameChange={handleCurrentViewChange}
          />
          <WeekView startDayHour={10} endDayHour={19} />
          <WeekView
            name="Work Week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
          />
          <MonthView />
          <DayView />

          <Toolbar />
          <DateNavigator />
          {/* <ViewSwitcher /> */}
          <Appointments />
        </Scheduler>
      </Paper>
    </>
  );
};

export default View;
