import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import update from 'immutability-helper';
import { Grid } from '@material-ui/core';
import { Header } from "./Header";
import { defaultWebsites } from "../assets/DefaultWebsites";
import { getNews } from "../redux/actions/NewsActions";
import {NewsListContainer} from "./NewsListContainer";

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
        selectedStartDate: moment(),
        selectedEndDate: moment(),
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
    const { websiteList } = this.state;
    const { getNews } = this.props;
    let objectToSend = [];
    Object.keys(websiteList).forEach( name => {
      if(websiteList[name].checked) {
        const { url, newsCount, selectedStartDate, selectedEndDate } = websiteList[name];
        objectToSend.push({
          url,
          newsCount,
          startDate: moment(selectedStartDate).locale('en').format('YYYY-MM-DD'),
          endDate: moment(selectedEndDate).locale('en').format('YYYY-MM-DD'),
        });
      }
    });
    getNews(objectToSend);
  };

  render() {
    return (
      <Grid>
        <Header
          websiteList={this.state.websiteList}
          handleChangeWebSiteList={this.handleChangeWebSiteList}
          handleSubmitWebsiteData={this.handleSubmitWebsiteData}
        />
        <NewsListContainer
          newsList={this.props.newsList && this.props.newsList}
          websiteList={this.state.websiteList}
        />
      </Grid>
    );
  }
}

HomePage.propTypes = {
  newsList: PropTypes.shape({}),
  getNews: PropTypes.func,
};

const mapStateToProps = (state) => ({
  newsList: state.newsList,
});

const mapDispatchToProps = dispatch => ({
  getNews: filteredData => dispatch(getNews(filteredData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);