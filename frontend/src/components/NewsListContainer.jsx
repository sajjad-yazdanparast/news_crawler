import React from "react";
import PropTypes from 'prop-types';
import { Card, CardContent, Grid } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import {NewsCard} from "./NewsCard";
import { defaultWebsites } from "../assets/DefaultWebsites";

export const NewsListContainer = (props) => {
  const { newsList, websiteList } = props;
  return (
    <Grid container>
      {
        newsList && newsList.isFetching &&
        ['','','','','',''].map((d, i) =>
          <Card key={i}>
            <Skeleton variant={'rect'} animation={'wave'} width={400} height={300} />
            <CardContent>
              <Skeleton animation={'wave'} height={10} style={{marginBottom: '6px'}} />
              <Skeleton animation={'wave'} height={10} width={'80%'} />
            </CardContent>
          </Card>
        )
      }
      {
        newsList && newsList.fetchedNews && newsList.fetchedNews.length > 1 &&
          newsList.fetchedNews.filter(({url}) => url !== '').map(({ url, news }, index) => {
            return (
              news.map((item, i) =>
                <NewsCard
                  key={i}
                  avatar={() => {
                    let hasAvatar = defaultWebsites.find(site => site.url === url);
                    return hasAvatar && hasAvatar.avatar;
                  }}
                  name={Object.keys(websiteList).find(name => websiteList[name].url === url)}
                  url={url}
                  title={item.title}
                  summary={item.summary}
                  link={item.link}
                  date={item.date}
                />
              )
            )
          })
      }
    </Grid>
  );
};

NewsListContainer.propTypes = {
  newsList: PropTypes.shape({}),
  websiteList: PropTypes.shape({}),
};