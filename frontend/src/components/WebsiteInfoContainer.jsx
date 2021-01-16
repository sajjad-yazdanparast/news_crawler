import React from "react";
import PropTypes from 'prop-types';
import {WebsiteInfo} from "./WebsiteInfo";

export const WebsiteInfoContainer = (props) => {
  const { websiteList, handleChangeWebSiteList } = props;
  return (
    <div>
      {
        Object.keys(websiteList).map( name => {
          return (
            <WebsiteInfo
              key={name}
              data={websiteList[name]}
              handleChangeStartDate={(date) => handleChangeWebSiteList(name, 'selectedStartDate', date)}
              handleChangeEndDate={(date) => handleChangeWebSiteList(name, 'selectedEndDate', date)}
              handleChangeNewsCount={(event) => handleChangeWebSiteList(name, 'newsCount', event.target.value)}
              handleToggleCheck={(event) => handleChangeWebSiteList(name, 'checked', event.target.checked)}
            />
          );
        })
      }
    </div>
  );
}

WebsiteInfoContainer.propTypes = {
  websiteList: PropTypes.shape({}),
  handleChangeWebSiteList: PropTypes.func,
}