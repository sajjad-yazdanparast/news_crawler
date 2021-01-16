import React from "react";
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import JalaaliUtils from '@date-io/jalaali';
import { Avatar, Checkbox, Tooltip, TextField, Grid } from "@material-ui/core";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

export const WebsiteInfo = (props) => {
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
    <Grid container>
      <Checkbox
        checked={checked}
        onChange={handleToggleCheck}
      />
      <Tooltip title={url}>
        <Avatar alt={'name'} src={avatar} />
      </Tooltip>
      <TextField
        disabled={!checked}
        label={'نام سایت'}
        InputProps={{
          readOnly: true,
        }}
        variant={'outlined'}
        value={name}
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