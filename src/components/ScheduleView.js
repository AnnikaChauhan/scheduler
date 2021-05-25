import React, { useState } from "react";
import { Paper } from "@material-ui/core";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments,
  Toolbar,
  ViewSwitcher,
  MonthView,
  DayView,
  DateNavigator,
  AppointmentTooltip,
  // AppointmentForm,
  CurrentTimeIndicator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import { data } from "../data";
import {
  DayScaleCellWeekView,
  TimeTableCellWeekView,
  DayScaleCellMonthView,
  TimeTableCellMonthView,
  AppointmentTooltipContent,
  AppointmentTooltipHeader,
} from "./cellCustomisation";

const View = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentView, setCurrentView] = useState("Week");

  const handleCurrentDateChange = (date) => {
    // console.log(date);
    // ! call to endpoint can go here
    setCurrentDate(date);
  };

  const handleCurrentViewChange = (view) => {
    console.log(view);
    // ! call to endpoint can go here
    setCurrentView(view);
  };

  return (
    <>
      {/* <Switcher
        currentViewName={currentView}
        onChange={handleCurrentViewChange}
      /> */}
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
          {/* if you comment out one of the views then it takes it from the switcher */}
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
          <AppointmentTooltip
            showCloseButton
            // open button is the edit button
            // showOpenButton
            contentComponent={AppointmentTooltipContent}
            headerComponent={AppointmentTooltipHeader}
          />
          {/* this is that edit thing from like a draw that we prob won't use as we have our own functionality */}
          {/* <AppointmentForm readOnly /> */}
          <CurrentTimeIndicator
            // shadePreviousCells={true}
            shadePreviousAppointments={true}
            updateInterval={100000}
          />
          <TodayButton />
          <ViewSwitcher
            onCurrentViewNameChange={handleCurrentViewChange}
            currentViewName={currentView}
          />
        </Scheduler>
      </Paper>
    </>
  );
};

export default View;
