import React, { useState } from "react";
import PropTypes from 'prop-types';
import { AppBar, Toolbar, IconButton, Tooltip } from "@material-ui/core";
import { SettingsRounded } from "@material-ui/icons";

//components
import { SettingsDialog } from "./SettingsDialog";

export const Header = (props) => {
  const [ openDialog, setOpenDialog ] = useState(false);
  const { websiteList, handleChangeWebSiteList, handleSubmitWebsiteData } = props;
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Tooltip title={'انتخاب سایت خبری'}>
            <IconButton edge={'end'} onClick={() => setOpenDialog(true)}>
              <SettingsRounded style={{color: 'white'}}/>
            </IconButton>
          </Tooltip>
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