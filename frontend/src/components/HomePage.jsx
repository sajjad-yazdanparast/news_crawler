import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import update from 'immutability-helper';
import { Grid } from '@material-ui/core';
import { Header } from "./Header";
import { defaultWebsites } from "../assets/DefaultWebsites";

class HomePage extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      websiteList: {},
    };
  }

  componentDidMount() {
    let initWebSiteList = {};
    defaultWebsites.forEach(({ name, ...rest}) => {
      initWebSiteList[name] = {
        name,
        checked: false,
        newsCount: 0,
        selectedStartDate: null,
        selectedEndDate: null,
        ...rest,
      };
    });
    this.setState(() => ({websiteList: initWebSiteList}));
  }

  handleChangeWebSiteList= (name, key, value) => {
    const { websiteList } = this.state;
      let newWebsiteList = update(websiteList,
        {
          [name]: websiteList[name] ? {
             [key]: { $set: value }
          } : {
            $set: {
              [key]: value,
              checked: false,
              newsCount: 0,
              selectedStartDate: null,
              selectedEndDate: null,
              avatar: name,
            }
          }
        });
    this.setState(() => ({websiteList: newWebsiteList}));
  };

  handleSubmitWebsiteData = () => {

  };

  render() {
    return (
      <Grid>
        <Header
          websiteList={this.state.websiteList}
          handleChangeWebSiteList={this.handleChangeWebSiteList}
          handleSubmitWebsiteData={this.handleSubmitWebsiteData}
        />
      </Grid>
    );
  }
}

HomePage.propTypes = {

};

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);