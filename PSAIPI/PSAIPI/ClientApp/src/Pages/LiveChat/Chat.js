import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import './Chat.css';
import { useHistory } from 'react-router-dom';

const Chat = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [isConnectionClosed, setIsConnectionClosed] = useState(false);
  const history = useHistory();

  const joinRoom = async (name, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7217/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (name, message) => {
        setMessages(messages => [...messages, { name, message }]);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
      });

      await connection.start();
      await connection.invoke("JoinRoom", { name, room });
      if(localStorage.getItem("roleId") != 2) {
        await connection.invoke("NotifySupport", "Test");
      }
      setConnection(connection);
    } catch (e) {
      console.log(e);
    }
  }

  const sendMessage = async (message) => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (e) {
      console.log(e);
    }
  }

  const closeConnection = async () => {
    try {
      await connection.stop();
      setIsConnectionClosed(true);
    } catch (e) {
      console.log(e);
    }
  }

  const openRatingPage = () => {
    history.push(`/supportRate/`);
  }

  return (
      <>
        <div>
            <button className='btn btn-success' onClick={() => joinRoom(localStorage.getItem("roleId") == 2 ? "Support" : "User", 'Support')}>Pradeti pokalbi</button>
            {(isConnectionClosed && localStorage.getItem("roleId") != 2) && <button className='btn btn-danger ml-5' onClick={() => openRatingPage()}>Įvertinti klientų aptarnavimo specialisto darbo kokybę</button>}
        </div>
        {connection &&
            <>
                <div className='leave-room'>
                    <button className='btn btn-danger' onClick={() => closeConnection()}>Baigti pokalbi</button>
                </div>
                <div className='chat'>
                    <MessageContainer messages={messages} />
                    <SendMessageForm sendMessage={sendMessage} />
                </div>
            </>}
    </>

  )
}

export default Chat;