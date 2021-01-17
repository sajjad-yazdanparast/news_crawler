import React, {useState} from "react";
import PropTypes from 'prop-types';
import jMoment from 'moment-jalaali';
import { Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Typography,
  Collapse,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OpenInNewRounded, ExpandMoreRounded } from "@material-ui/icons";
import { defaultWebsites } from "../assets/DefaultWebsites";

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });

const useStyles = makeStyles( theme => ({
  root: {
    margin: theme.spacing(2),
    maxWidth: 345,
    width: 345
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    '&:hover': {
      cursor: 'pointer',
    }
  },
}));

export const NewsCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { avatar, name, url, title, summary, link, date } = props;
  const classes = useStyles();

  const getSummary = () => {
    return summary;
  };

  const getAvatar = () => {
    let site = defaultWebsites.find(site => site.name === name);
    return site && site.avatar
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            alt={name}
            src={getAvatar()}
            onClick={() => window.open(url, '_blank')}
            className={classes.avatar}
          />
        }
        title={name}
        subheader={jMoment(date).format('jDD jMMMM jYYYY ')}
      />
      <CardMedia
        image={''}
        onClick={() => window.open(link, '_blank')}
        title={link}
        className={classes.madia}
      />
      <CardContent>
        <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => window.open(link, '_blank')}
        >
          <OpenInNewRounded />
        </IconButton>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className={`${classes.expand} ${expanded ? classes.expandOpen : ''}`}
        >
          <ExpandMoreRounded />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout={"auto"} unmountOnExit addEndListener={() => {}}>
        <CardContent>
          <Typography>
            {getSummary()}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

NewsCard.propTypes = {
  avatar: PropTypes.func,
  name: PropTypes.string,
  url: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  link: PropTypes.string,
  date: PropTypes.string,
};