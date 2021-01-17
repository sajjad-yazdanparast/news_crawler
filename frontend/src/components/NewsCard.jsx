import React, {useState} from "react";
import PropTypes from 'prop-types';
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
import { OpenInNewRounded, ExpandMoreRounded } from "@material-ui/icons";

export const NewsCard = (props) => {
  const [expanded, setExpanded] = useState(false);
  const { avatar, name, url, title, summary, link, date } = props;

  const getDateFormat = () => {
    let d = '', m = '', y = '';
    // d = new Intl.DateTimeFormat('fa', { day: 'numeric'}).format(date.toDate());
    // m = new Intl.DateTimeFormat('fa', { month: 'long'}).format(date.toDate());
    // y = new Intl.DateTimeFormat('fa', { day: 'numeric'}).format(date.toDate());
    return `${y} ${m} ${d}`;
  };

  const getSummary = () => {
    return summary;
  };

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar alt={name} src={avatar} />
        }
        title={name}
        subheader={getDateFormat()}
      />
      <CardMedia
        image={''}
        onClick={() => window.open(link, '_blank')}
        title={link}
      />
      <CardContent>
        <Typography variant={'body2'} color={'textSecondary'} component={'p'}>
          {title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={() => window.open(url, '_blank')}
        >
          <OpenInNewRounded />
        </IconButton>
        <IconButton
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
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
  name: PropTypes.func,
  url: PropTypes.string,
  title: PropTypes.string,
  summary: PropTypes.string,
  link: PropTypes.string,
  date: PropTypes.string,
};