import React from "react";
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import JalaaliUtils from '@date-io/jalaali';
import { Avatar, Checkbox, Tooltip, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}));

export const WebsiteInfo = (props) => {
  const classes = useStyles();
  const {
    handleToggleCheck,
    handleChangeNewsCount,
    handleChangeStartDate,
    handleChangeEndDate,
  } = props;
  const { name,
    url,
    avatar,
    checked,
    newsCount,
    selectedStartDate,
    selectedEndDate,
  } = props.data;

  return (
    <Grid
      container
      direction={'row'}
      justify={'center'}
      alignItems={'center'}
      wrap={'nowrap'}
      className={classes.root}
    >
      <Checkbox
        checked={checked}
        onChange={handleToggleCheck}
      />
      <Tooltip title={url}>
        <Avatar alt={'name'} src={avatar} />
      </Tooltip>
      <TextField
        value={name}
        label={'نام سایت'}
        disabled={!checked}
        InputProps={{
          readOnly: true,
        }}
        variant={'outlined'}
        size={'small'}
      />
      <TextField
        id={'news-count'}
        disabled={!checked}
        label={'تعداد خبر'}
        type={'number'}
        InputLabelProps={{
          shrink: true,
        }}
        value={newsCount}
        onChange={handleChangeNewsCount}
        variant={'outlined'}
        size={'small'}
      />
      <MuiPickersUtilsProvider utils={JalaaliUtils} locale={'fa'}>
        <KeyboardDatePicker
          id={'start-date'}
          autoOk
          label={'از تاریخ'}
          okLabel={''}
          disabled={!checked}
          labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
          format={'jYYYY/jMM/jDD'}
          value={selectedStartDate}
          onChange={handleChangeStartDate}
          inputVariant={'outlined'}
          size={'small'}
        />
      </MuiPickersUtilsProvider>
      <MuiPickersUtilsProvider utils={JalaaliUtils} locale={'fa'}>
        <KeyboardDatePicker
          id={'end-date'}
          autoOk
          label={'تا تاریخ'}
          okLabel={''}
          disabled={!checked}
          labelFunc={date => (date ? date.format('jYYYY/jMM/jDD') : '')}
          format={'jYYYY/jMM/jDD'}
          value={selectedEndDate}
          onChange={handleChangeEndDate}
          inputVariant={'outlined'}
          size={'small'}
        />
      </MuiPickersUtilsProvider>
    </Grid>
  );
}

WebsiteInfo.propTypes = {
  data: PropTypes.shape({}).isRequired,
  handleChangeStartDate: PropTypes.func,
  handleChangeEndDate: PropTypes.func,
  handleChangeNewsCount: PropTypes.func,
  handleToggleCheck: PropTypes.func,
}