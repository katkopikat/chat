import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import MicNoneIcon from '@material-ui/icons/MicNone';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import IconButton from '@material-ui/core/Button';
import socket from '../../socket';

const MassageInput = ( { roomId, userName, onSetMessage }) => {
    const [message, setMessage] = useState('');
    const [recordPocess, setRecordProcess] = useState(false);
    const commands = [{
                      command: 'стоп',
                      callback: () => stopSpeechRecognition()
                      }];
    const { transcript } = useSpeechRecognition({ commands });

    const handleChange = (e) => {
        setMessage(e.target.value);
    }

    const startSpeechRecognition = () => {
        setRecordProcess(true);
        SpeechRecognition.startListening({ language: 'ru',
                                           continuous: true,
                                           interimTranscript: true,
                                        });
    }

    const stopSpeechRecognition = () => {
        setRecordProcess(false);
        SpeechRecognition.stopListening();
    }

    const sendMessage = () => {
      if (recordPocess) stopSpeechRecognition();

      const currentTime = new Date();
      const msg =  {
          roomId,
          author: userName,
          messageText: message,
          messageTime: `${currentTime.getHours()}:${currentTime.getMinutes()}`
      }
      socket.emit('ROOM:SET_NEW_MESSAGE', msg);
      onSetMessage(msg);
      setMessage('');
    }

    useEffect(() => {
      setMessage(transcript);
    }, [transcript])
  
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      return null
    }
    
    return (
        <form className="msg__input">
            <textarea
            value={message}
            onChange={(e) => handleChange(e)}
            />

            <IconButton
            className="speech__btn"
            onClick={ !recordPocess ? startSpeechRecognition : stopSpeechRecognition }> 
              { !recordPocess? <MicNoneIcon /> : <SettingsVoiceIcon /> }
            </IconButton>
           
            <button
            onClick={sendMessage}
            type="button">
            Send
            </button>
        </form>
    )
}

export default MassageInput;