import { useEffect, useState } from 'react';
import { Box, Input, Button, Stack, Text } from '@chakra-ui/react';
import { io } from 'socket.io-client';
import { useAuth } from '../contexts/AuthContext';

const socket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000');

export default function Chat() {
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { user: user.name, text: message });
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off('receive_message');
  }, []);

  return (
    <Box p={6}>
      <Text fontWeight="bold" mb={4}>Live Chat</Text>
      <Box border="1px" borderRadius="md" p={4} height="300px" overflowY="auto">
        {messages.map((msg, i) => (
          <Text key={i}><strong>{msg.user}:</strong> {msg.text}</Text>
        ))}
      </Box>
      <Stack direction="row" mt={4}>
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button onClick={sendMessage}>Send</Button>
      </Stack>
    </Box>
  );
}
