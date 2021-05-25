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

  const TimeTableCell = (props) => {
    const classes = useStyles();
    const { startDate } = props;
    const date = new Date(startDate);

    if (date.getDate() === new Date().getDate()) {
      return (
        <WeekView.TimeTableCell {...props} className={classes.todayCell} />
      );
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
      return (
        <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
      );
    }
    return <WeekView.TimeTableCell {...props} />;
  };

  const DayScaleCell = (props) => {
    const classes = useStyles();
    const { startDate, today } = props;

    if (today) {
      return <WeekView.DayScaleCell {...props} className={classes.today} />;
    }
    if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return <WeekView.DayScaleCell {...props} className={classes.weekend} />;
    }
    return <WeekView.DayScaleCell {...props} />;
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
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <WeekView
            name="Work Week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={9}
            endDayHour={19}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
          <MonthView />
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
