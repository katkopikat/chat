import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    orange: {
      color: theme.palette.getContrastText(deepOrange[500]),
      backgroundColor: deepOrange[500],
    },
    purple: {
      color: theme.palette.getContrastText(deepPurple[500]),
      backgroundColor: deepPurple[500],
    },
  }));

const MessageBlock = ( { author, messageText, messageTime, userName } ) => {
    const classes = useStyles();

    return (
        <div className={`msg ${author === userName ? 'msg--right' : 'msg--left'}`}>
            <div className="msg__avatar">
            {/* <Avatar className={classes.purple}>{author[0]}</Avatar> */}
            </div>
            <span className="msg__time">
            {messageTime}
            </span>
            <h2 className="msg__name">{author}</h2>
           
            <p className="msg__text">
            {messageText}
            </p>
          
        </div>
    )
}

export default MessageBlock;