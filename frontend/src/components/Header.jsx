import React, { useState } from "react";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { SettingsRounded } from "@material-ui/icons";
import { SettingsDialog } from "./SettingsDialog";

const useStyles = makeStyles( theme => ({
  root: {
    position: 'relative',
  },
  title: {
    flexGrow: 1,
    margin: '0 40px',
  }
}));

export const Header = (props) => {
  const [ openDialog, setOpenDialog ] = useState(false);
  const { websiteList, handleChangeWebSiteList, handleSubmitWebsiteData } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar className={classes.root}>
        <Toolbar>
          <Tooltip title={'انتخاب سایت خبری'}>
            <IconButton edge={'end'} onClick={() => setOpenDialog(true)}>
              <SettingsRounded style={{color: 'white'}}/>
            </IconButton>
          </Tooltip>
          <Typography variant="h6" className={classes.title}>
            News Crawler
          </Typography>

        </Toolbar>
      </AppBar>
      <SettingsDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        websiteList={websiteList}
        handleChangeWebSiteList={handleChangeWebSiteList}
        handleSubmitWebsiteData={handleSubmitWebsiteData}
      />
    </React.Fragment>
  );
}

Header.propTypes = {
  websiteList: PropTypes.shape({}),
  handleChangeWebSiteListL: PropTypes.func,
  handleSubmitWebsiteData: PropTypes.func,
};