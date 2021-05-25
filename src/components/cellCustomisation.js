import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  WeekView,
  MonthView,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Grid from "@material-ui/core/Grid";
import Room from "@material-ui/icons/Room";
import { withStyles } from "@material-ui/core/styles";
import classNames from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MoreIcon from "@material-ui/icons/MoreVert";

const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: "center",
  },
  firstRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)",
  },
  secondRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)",
  },
  thirdRoom: {
    background:
      "url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)",
  },
  header: {
    height: "260px",
    backgroundSize: "cover",
  },
  commandButton: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
});

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

export const TimeTableCellWeekView = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (date.getDate() === new Date().getDate()) {
    return <WeekView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <WeekView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <WeekView.TimeTableCell {...props} />;
};

export const DayScaleCellWeekView = (props) => {
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

export const TimeTableCellMonthView = (props) => {
  const classes = useStyles();
  const { startDate } = props;
  const date = new Date(startDate);

  if (
    date.getDate() === new Date().getDate() &&
    date.getMonth() === new Date().getMonth()
  ) {
    return <MonthView.TimeTableCell {...props} className={classes.todayCell} />;
  }
  if (date.getDay() === 0 || date.getDay() === 6) {
    return (
      <MonthView.TimeTableCell {...props} className={classes.weekendCell} />
    );
  }
  return <MonthView.TimeTableCell {...props} />;
};

export const DayScaleCellMonthView = (props) => {
  const classes = useStyles();
  const { startDate, today } = props;

  if (today) {
    return <MonthView.DayScaleCell {...props} className={classes.today} />;
  }
  if (startDate.getDay() === 0 || startDate.getDay() === 6) {
    return <MonthView.DayScaleCell {...props} className={classes.weekend} />;
  }
  return <MonthView.DayScaleCell {...props} />;
};

export const AppointmentTooltipContent = withStyles(style, { name: "Content" })(
  ({ children, appointmentData, classes, ...restProps }) => {
    console.log(appointmentData);
    return (
      <AppointmentTooltip.Content
        {...restProps}
        appointmentData={appointmentData}
      >
        <Grid container alignItems="center" className={classes.textCenter}>
          <span>{appointmentData.description}</span>
        </Grid>
      </AppointmentTooltip.Content>
    );
  }
);

const getClassByLocation = (classes, location) => {
  if (location === "Room 1") return classes.firstRoom;
  if (location === "Room 2") return classes.secondRoom;
  return classes.thirdRoom;
};

export const AppointmentTooltipHeader = withStyles(style, { name: "Header" })(
  ({ children, appointmentData, classes, ...restProps }) => (
    <AppointmentTooltip.Header
      //  if you comment out rest props you don't have to use their header things at all
      {...restProps}
      className={classNames(
        getClassByLocation(classes, appointmentData.location),
        classes.header
      )}
      appointmentData={appointmentData}
    >
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => alert(JSON.stringify(appointmentData))}
        className={classes.commandButton}
      >
        <MoreIcon />
      </IconButton>
    </AppointmentTooltip.Header>
  )
);
