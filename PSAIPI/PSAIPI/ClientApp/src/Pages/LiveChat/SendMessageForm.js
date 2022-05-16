import { Form, Button, FormControl, InputGroup } from 'react-bootstrap';
import { useState } from 'react';
import './Chat.css';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');

    return <form
        onSubmit={e => {
            e.preventDefault();
            sendMessage(message);
            setMessage('');
        }}>
            <div className='chatContainer d-flex'>
                <div className='chatInput'>
                    <input id="chatInput" type="text" className="form-control" placeholder="Text" aria-label="Username" aria-describedby="basic-addon1" onChange={e => setMessage(e.target.value)} value={message} />
                </div>
                <div className='chatSendButton'>
                    <button className='btn btn-success' type="submit">Send</button>
                </div>
            </div>
    </form>
}

export default SendMessageForm;
