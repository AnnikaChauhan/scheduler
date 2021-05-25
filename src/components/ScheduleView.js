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

const useStyles = makeStyles((theme) => ({
  todayCell: {
    backgroundColor: fade(theme.palette.primary.main, 0.1),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.14),
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
  },
  weekendCell: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    "&:hover": {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
    "&:focus": {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
    },
  },
  today: {
    backgroundColor: fade(theme.palette.primary.main, 0.16),
  },
  weekend: {
    backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
  },
}));

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
          <AppointmentForm readOnly />
          {/* <ViewSwitcher /> */}
        </Scheduler>
      </Paper>
    </>
  );
};

export default View;
