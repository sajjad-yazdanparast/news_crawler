import React from "react";
import PropTypes from 'prop-types';
import { Card, CardContent, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Skeleton from '@material-ui/lab/Skeleton';
import {NewsCard} from "./NewsCard";
import { defaultWebsites } from "../assets/DefaultWebsites";

const useStyles = makeStyles( theme => ({
  root: {
    margin: 'auto',
  },
  rootSkeleton: {
    margin: theme.spacing(2),
    maxWidth: 345,
    width: 345,
  },
}));

export const NewsListContainer = (props) => {
  const { newsList, websiteList } = props;
  const classes = useStyles();

  return (
    <Grid container item justify={'center'} xs={10} className={classes.root}>
      {
        newsList && newsList.fetchedNews && newsList.fetchedNews.length === 1 && !newsList.isFetching &&
          <h2>
            هیچ خبری نیست!
          </h2>
      }
      {
        newsList && newsList.isFetching &&
        ['','','','','',''].map((d, i) =>
          <Card key={i} className={classes.rootSkeleton}>
            <Skeleton variant={'rect'} animation={'wave'} width={345} height={150} />
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