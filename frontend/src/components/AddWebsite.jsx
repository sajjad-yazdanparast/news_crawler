import React, {useState} from "react";
import PropTypes from 'prop-types';
import {Button, TextField, Popover} from "@material-ui/core";

export const AddWebsite = (props) => {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const {open, handleClose, handleAddNewWebsite} = props;

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
      <TextField
        label={'نام سایت'}
        value={name}
        onChange={e => setName(e.target.value)}
        variant={'outlined'}
        margin={'dense'}
      />
      <TextField
        label={'آدرس'}
        value={url}
        onChange={e => setUrl(e.target.value)}
        variant={'outlined'}
        margin={'dense'}
      />
      <Button
        onClick={handleSubmit}
      >
        ثبت
      </Button>
    </Popover>
  );
}

AddWebsite.propTypes = {
  handleAddNewWebsite: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.any,
};