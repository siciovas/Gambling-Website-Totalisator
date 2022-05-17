import { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import MessageContainer from './MessageContainer';
import SendMessageForm from './SendMessageForm';
import './Chat.css';

const Chat = () => {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  const joinRoom = async (name, room) => {
    try {
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7217/chat")
        .configureLogging(LogLevel.Information)
        .build();

      connection.on("ReceiveMessage", (name, message) => {
        setMessages(messages => [...messages, { name, message }]);
      });

      connection.on("UsersInRoom", (users) => {
        setUsers(users);
      });

      connection.onclose(e => {
        setConnection();
        setMessages([]);
        setUsers([]);
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
    } catch (e) {
      console.log(e);
    }
  }

  return (
      <>
        <div>
            <button className='btn btn-success' onClick={() => joinRoom(localStorage.getItem("roleId") == 2 ? "Support" : "User", 'Support')}>Pradeti pokalbi</button>
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