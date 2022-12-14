import React, { useRef, useState } from 'react';
import { Message } from './types';
import * as style from './app.css';

const WebSock = () => {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [value, setValue] = useState('');
  const socket = useRef<WebSocket>();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');

  function connect() {
    socket.current = new WebSocket('ws://localhost:3000');

    socket.current.onopen = () => {
      setConnected(true);
      const message: Message = {
        event: 'connection',
        username,
        id: Date.now(),
      };
      socket.current && socket.current.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event) => {
      const message: Message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    };
  }

  const sendMessage = async () => {
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message',
    };
    socket.current && socket.current.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
            <div className={style.center}>
                <div className={style.form}>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        placeholder="Введите ваше имя" />
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
    );
  }

  return (
        <div className={style.center}>
            <div>
                <div className={style.form}>
                    <input value={value} onChange={(e) => setValue(e.target.value)} type="text" />
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className={style.message}>
                    {messages.map((mess) => <div key={mess.id}>
                        {mess.event === 'connection'
                          ? <div className={style.connection_message}>
                                Пользователь {mess.username} подключился
                            </div>
                          : <div className={style.message}>
                                {mess.username}. {mess.message}
                            </div>
                        }
                    </div>)}
                </div>
            </div>
        </div>
  );
};

export default WebSock;
