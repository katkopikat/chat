import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './MessageBlock.css';

const MessageBlock = ( { author, messageText, messageTime, userName } ) => {
    const isAuthorMsg = author === userName ? '--right' : '--left';
    return (
      <div className={`msg__wrapper msg__wrapper${isAuthorMsg}`}>
        <div className="msg__avatar">
          <Avatar className={`msg__avatar msg__avatar${isAuthorMsg}`}>{author[0].toUpperCase()}</Avatar>
        </div>
        <div className={`msg msg${isAuthorMsg}`}>
            <span className="msg__time">
            {messageTime}
            </span>
            <h2 className="msg__name">{author}</h2>
           
            <p className="msg__text">
            {messageText}
            </p>
        </div>
      </div>
    )
}

export default MessageBlock;