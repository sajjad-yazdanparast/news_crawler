import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button, TextField, Popover, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    }
  }
}));


export const AddWebsite = (props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const {open, handleClose, handleAddNewWebsite} = props;
  const classes = useStyles();

  const handleSubmit = () => {
    if (name !== '' && url !== '') {
      handleAddNewWebsite(name, url);
      setName('');
      setUrl('');
    }
  };

  return (
    <Popover
      open={Boolean(open)}
      anchorEl={open}
      onClose={handleClose}
    >
      <Grid container direction={'column'} justify={'center'} alignItems={'start'} className={classes.root}>
        <TextField
          label={'نام سایت'}
          value={name}
          onChange={e => setName(e.target.value)}
          variant={'outlined'}
          size={'small'}
        />
        <TextField
          label={'آدرس'}
          value={url}
          onChange={e => setUrl(e.target.value)}
          variant={'outlined'}
          size={'small'}
        />
        <Button
          onClick={handleSubmit}
          color={'primary'}
          variant={'outlined'}
        >
          ثبت
        </Button>
      </Grid>
    </Popover>
  );
}

AddWebsite.propTypes = {
  handleAddNewWebsite: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.any,
};