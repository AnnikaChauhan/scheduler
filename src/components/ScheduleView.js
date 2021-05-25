import React, { useState } from "react";
import { Paper, makeStyles } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  // ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  AppointmentTooltip,
  AppointmentForm,
  CurrentTimeIndicator,
} from "@devexpress/dx-react-scheduler-material-ui";
import { data } from "../data";
import Switcher from "./ViewSwitcher";
import { fade } from "@material-ui/core/styles/colorManipulator";
import {
  DayScaleCellWeekView,
  TimeTableCellWeekView,
  DayScaleCellMonthView,
  TimeTableCellMonthView,
} from "./cellCustomisation";

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
          <WeekView
            startDayHour={7}
            endDayHour={19}
            timeTableCellComponent={TimeTableCellWeekView}
            dayScaleCellComponent={DayScaleCellWeekView}
          />
          <WeekView
            name="Work Week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={TimeTableCellWeekView}
            dayScaleCellComponent={DayScaleCellWeekView}
          />
          <MonthView
            timeTableCellComponent={TimeTableCellMonthView}
            dayScaleCellComponent={DayScaleCellMonthView}
          />
          <DayView />

          <Toolbar />
          <DateNavigator />
          <Appointments />
          <AppointmentTooltip showCloseButton showOpenButton />
          {/* this is that edit thing from like a draw that we prob won't use as we have our own functionality */}
          {/* <AppointmentForm readOnly /> */}
          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
            updateInterval={100000}
          />
          {/* <ViewSwitcher /> */}
        </Scheduler>
      </Paper>
    </>
  );
};

export default View;
