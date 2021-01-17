import React, {useState} from "react";
import PropTypes from 'prop-types';
import { Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Typography,
  Tooltip,
  Button,
  Grid,
  Fab,
} from "@material-ui/core";
import { AddRounded } from "@material-ui/icons";
import {WebsiteInfoContainer} from "./WebsiteInfoContainer";
import {AddWebsite} from "./AddWebsite";

export const SettingsDialog = (props) => {
  const { open, handleClose, websiteList, handleChangeWebSiteList, handleSubmitWebsiteData } = props;
  const [ openAddSite, setOpenAddSite ] = useState(null);

  const handleAddNewWebsite = (name, url) => {
    handleChangeWebSiteList(name, 'name', name);
    setTimeout(() => handleChangeWebSiteList(name, 'url', url), 1);
    setOpenAddSite(null);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography>
          انتخاب سایت‌های خبری
        </Typography>
      </DialogTitle>
      <DialogContent>
        <WebsiteInfoContainer
          websiteList={websiteList}
          handleChangeWebSiteList={handleChangeWebSiteList}
        />
        <Grid container>
          <Tooltip title={'اضافه‌کردن وب‌سایت'}>
            <Fab
              onClick={(event) => setOpenAddSite(event.currentTarget)}
              color={'primary'}
            >
              <AddRounded />
            </Fab>
          </Tooltip>
        </Grid>
        <AddWebsite
          open={openAddSite}
          handleClose={() => setOpenAddSite(null)}
          handleAddNewWebsite={handleAddNewWebsite}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color={'primary'}
        >
          انصراف
        </Button>
        <Button
          onClick={() => {
            handleSubmitWebsiteData();
            handleClose();
          }}
          color={'primary'}
          variant={'contained'}
        >
          ثبت
        </Button>
      </DialogActions>
    </Dialog>
  );
};

SettingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  websiteList: PropTypes.shape({}),
  handleChangeWebSiteList: PropTypes.func,
  handleSubmitWebsiteData: PropTypes.func,
};