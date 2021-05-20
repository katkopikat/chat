import MessageBlock from './MessageBlock';
import MessageInput from './MessageInput';
import UsersBlock from './UsersBlock';
import './TextChatRoom.css';

const tempMsgs = [
        {
          "messageId": "1",
          "author": "Кирилл",
          "messageText": "Привет! Всё в силе: идём на баскет сегодня?",
          "messageTime": "13:14"
        },
        {
          "messageId": "2",
          "author": "Марк",
          "messageText": "Да, го на площадку к 19",
          "messageTime": "13:17"
        }
]


const TextChatRoom = () => (
    <div className="wrapper__chat">
        <div className="chat__header">
            <h3>Room 13</h3>
            <UsersBlock />
        </div>
        <div className="chat-right">
            <div className="chat__messages">
                { tempMsgs.map(msg => {
                    return (
                        <MessageBlock
                        author={msg.author}
                        messageText={msg.messageText}
                        messageTime={msg.messageTime}
                        key={msg.messageId} />
                        )
                    }
                )}
            </div>
            <MessageInput />
        </div>
    </div>
)

export default TextChatRoom;