import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginBottom: 10,
    background: props =>
      props.author === props.dpo
        ? '#b1bae6'
        : '#e4e4e4',
    border: 0,
    borderRadius: 3,
    boxShadow: props =>
      props.author === props.dpo
        ? '0 3px 5px 2px rgba(177, 186, 230, .3)'
        : '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  title: {
    fontSize: 14,
  },
});

export default function ChatCard(props) {
  const classes = useStyles(props);

  return (
    <Card className={classes.root}>
      <CardContent>                               
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.author}
        </Typography>
        <Typography variant="body2" component="p">
          {props.content}
        </Typography>
      </CardContent>
    </Card>
  );
}