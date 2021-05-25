import React from "react";
import { makeStyles } from "@material-ui/core";
import {
  WeekView,
  MonthView,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Grid from "@material-ui/core/Grid";
import DescriptionIcon from "@material-ui/icons/Description";

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
  header: {
    // this how you get the header in line with the rest of the content
    marginBottom: "-50px",
    // height: "260px",
    // backgroundSize: "cover",
  },
  commandButton: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
  icon: {
    color: theme.palette.action.active,
  },
  textCenter: {
    textAlign: "center",
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

export const AppointmentTooltipContent = ({
  children,
  appointmentData,
  ...restProps
}) => {
  const classes = useStyles();
  return (
    <AppointmentTooltip.Content
      {...restProps}
      appointmentData={appointmentData}
    >
      <Grid container alignItems="center">
        <Grid item xs={2} className={classes.textCenter}>
          <DescriptionIcon className={classes.icon} />
        </Grid>
        <Grid item xs={10}>
          <span>{appointmentData.description}</span>
        </Grid>
      </Grid>
    </AppointmentTooltip.Content>
  );
};

export const AppointmentTooltipHeader = ({
  children,
  appointmentData,
  ...restProps
}) => {
  const classes = useStyles();
  return (
    <AppointmentTooltip.Header
      //  if you comment out rest props you don't have to use their header things at all
      {...restProps}
      className={classes.header}
      appointmentData={appointmentData}
    />
  );
};
