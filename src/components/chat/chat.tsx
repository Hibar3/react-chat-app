import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import { Button, Input } from "@chakra-ui/react";
import { socket } from "@/store/socket";

type InputMsg = {
  room_id?: string;
  content?: string;
};


export const Chat = () => {
  const [messages, setMessages] = useState<Partial<InputMsg[]>>([{}]);
  const [messageInput, setMessageInput] = useState<InputMsg>({
    room_id: `666c076f402a1ef76f0f74d0`,
    content: "default",
  });
  const [socketIO, setSocket] = useState<Socket>(socket);

  useEffect(() => {
    setSocket(socketIO);
    socketIO.connect();
    // socket.emit("message");

    // console.log("connecting");

    socketIO.on("joinRoom", (data) => {
      // setMessages((prevMessages) => [...prevMessages, data]);
      console.log("joined room", data);
    });

    return () => {
      console.log("something");
      // socket.disconnect();
      socketIO.off("connect");
      socketIO.off("disconnect");
    };
  }, [socketIO]);

  socketIO.on("reply", (arg) => {
    setMessages((prevMessages) => [...prevMessages, arg]);
    console.log("connected", arg);
  });

  const sendMessage = () => {
    if (socketIO) {
      socketIO.emit("message", messageInput);
      setMessageInput({
        room_id: `666c076f402a1ef76f0f74d0`,
        content: "default",
      });
      console.log(messages);
    }
  };

  const onSetMsgInput = (value: string) => {
    const message = {
      room_id: `666c076f402a1ef76f0f74d0`,
      content: value,
    };

    setMessageInput(message);
  };

  return (
    <div>
      <div>
        <ul>
          {messages.map((data: any, index) => (
            <li key={index}>{data?.message?.content}</li>
          ))}
        </ul>
      </div>
      <div>
        <Input
          placeholder="type something..."
          size="md"
          type="text"
          value={messageInput?.content}
          onChange={(e) => onSetMsgInput(e.target.value)}
        />
        <Button colorScheme="teal" m={2} onClick={sendMessage}>
          Send
        </Button>
        <Button colorScheme="teal" m={2} onClick={() => socketIO.emit("joinRoom", `666c076f402a1ef76f0f74d0`)}>
          Join
        </Button>
      </div>
    </div>
  );
};

export default Chat;
