import { useEffect, useState, useRef } from 'react';
import { Box, Input, Button, Stack, Text, Divider } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

// Initialize socket connection
const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000', {
  withCredentials: true,
  transports: ['websocket'],
});

export default function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const sendMessage = () => {
    if (message.trim() && user?.name) {
      const newMsg = {
        user: user.name,
        text: message,
        timestamp: new Date().toLocaleTimeString(),
      };
      socket.emit('send_message', newMsg);
      setMessages((prev) => [...prev, newMsg]); // Local echo
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box p={6}>
      <Text fontWeight="bold" mb={4}>💬 Live Chat</Text>

      <Box
        border="1px"
        borderRadius="md"
        p={4}
        height="300px"
        overflowY="auto"
        bg="gray.50"
      >
        {messages.map((msg, i) => (
          <Box key={i} mb={2}>
            <Text fontWeight="bold">{msg.user}</Text>
            <Text>{msg.text}</Text>
            <Text fontSize="xs" color="gray.500">{msg.timestamp}</Text>
            <Divider my={2} />
          </Box>
        ))}
        <div ref={bottomRef}></div>
      </Box>

      <Stack direction="row" mt={4}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
      </Stack>
    </Box>
  );
}
